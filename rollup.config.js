// rollup.config.js (building more than one bundle)
import path  from 'path'
import vue   from 'rollup-plugin-vue'
import glob  from "glob";
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import alias                    from '@rollup/plugin-alias';
import dynamicImportVariables   from '@rollup/plugin-dynamic-import-vars';
import scss from 'rollup-plugin-scss';

import { camelCase } from 'lodash'
import {
  name as packageName,
  type as packageType,
  peerDependencies,
} from './package.json';

const cdnUrl    = 'https://cdn.jsdelivr.net/';
const sourcemap = true;
const outputDir = 'dist';
const external  = [ ...Object.keys(peerDependencies||{}) ];
const outputFormatExtensions = {
  'umd' : '.umd.js',
  'esm' : packageType=='module' ? '.js' : '.mjs',
  'cjs' : packageType!='module' ? '.js' : '.cjs',
}
const plugins = [ vue(), scss() ];
const isPreview = process.argv.includes('--preview');

export default async function(){
  let configs = [
    ...glob.sync('src/index.js'                ).map(c=>bundle(c, outputDir, o=>"index")),
    ...glob.sync('src/components/**/*.{js,vue}').map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.(js|vue)$/i, "$1"))),
    ...glob.sync('src/services/**/*.js'        ).map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.js$/i,       "$1"))),
    ...glob.sync('src/assets/**/*.css'        ).map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.css$/i,       "$1"))),
  ];
  if(isPreview)
    configs = [
      ...glob.sync('./index.vue').map(c=>bundle(c, outputDir, o=>"preview", true)),
      ...configs
    ]
    
  return configs
}

function bundle(input, outDir, getFilename, inlineDynamicImports ) {
  let ext        = path.extname (input);
  let filename   = path.basename(input, ext);

  if(getFilename) {
    filename = getFilename(input);
  }

  let subPackageName = filename;

  if(/\index$/.test(subPackageName)) {
    subPackageName = subPackageName.replace(/\index$/, "");
  }

  const filePath = path.join(outDir, filename);

  const output = [{ 
    
    sourcemap,
    format : "esm",
    file: `${filePath}${outputFormatExtensions['esm']}`,
    inlineDynamicImports,
  }, { 
    sourcemap,
    exports: 'auto',
    format : "cjs",
    file: `${filePath}${outputFormatExtensions['cjs']}`,
    inlineDynamicImports,
  }, 
  { 
    sourcemap,
    format : "umd",
    inlineDynamicImports,
    name: pascalCase(`${packageName}_${subPackageName}`.replace(/[^a-z0-9]/ig, "_")),
    file: `${filePath}${outputFormatExtensions['umd']}`,
    plugins: [
      alias({ entries : [
        { find: /^cdn!(.*)/,  replacement:`${cdnUrl}$1` },
      ]}),
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, not dead"}]],
        allowAllFormats: true
      }),
      // dynamicImportVariables({ include:`${filePath}/**/*.js` }),
    ]
  }]

  return {
    input,
    output,
    external,
    plugins
  }
}

function pascalCase(str) {
  str = camelCase(str);
  str = str[0].toUpperCase() + str.slice(1);
  return str;
}

