// rollup.config.js (building more than one bundle)
import path  from 'path'
import vue   from 'rollup-plugin-vue'
import glob  from "glob";
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import alias                    from '@rollup/plugin-alias';

import { camelCase } from 'lodash'
import {
  name as packageName,
  type as packageType,
  peerDependencies,
} from './package.json';

const cdnUrl    = 'https://cdn.jsdelivr.net/';
const sourcemap = true;
const outputDir = 'dist';
const external  = [ 
  ...Object.keys(peerDependencies||{}),
  new RegExp(cdnUrl)
];

const outputFormatExtensions = {
  'umd' : '.umd.js',
  'esm' : packageType=='module' ? '.js' : '.mjs',
  'cjs' : packageType!='module' ? '.js' : '.cjs',
}
const plugins = [ 
  vue(),
  alias({ entries : [
    { find: /^cdn!(.*)/,  replacement:`${cdnUrl}$1` },
    { find: /^css!cdn!(.*)/,  replacement:`css!${cdnUrl}$1` },
  ]})
];

export default async function(){
  return [
    ...glob.sync('src/index.js'                ).map(c=>bundle(c, outputDir, o=>"index")),
    ...glob.sync('src/components/**/*.{js,vue}').map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.(js|vue)$/i, "$1"))),
    ...glob.sync('src/services/**/*.js'        ).map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.js$/i,       "$1"))),
  ];
}

function bundle(input, outDir, getFilename ) {
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
  }, { 
    sourcemap,
    exports: 'auto',
    format : "cjs",
    file: `${filePath}${outputFormatExtensions['cjs']}`,
  }, { 
    sourcemap,
    format : "umd",
    name: pascalCase(`${packageName}_${subPackageName}`.replace(/[^a-z0-9]/ig, "_")),
    file: `${filePath}${outputFormatExtensions['umd']}`,
    plugins : [
      ...plugins,
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, not dead"}]],
        allowAllFormats: true
      })
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

