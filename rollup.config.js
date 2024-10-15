import path  from 'path'
import vue   from 'rollup-plugin-vue'
import glob  from "glob";
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import alias                    from '@rollup/plugin-alias';
import scss                     from 'rollup-plugin-scss';
import typescript               from '@rollup/plugin-typescript';
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
const plugins = [
  vue({
    preprocessStyles: true,
    compileTemplate: true,
    include: /\.vue$/,
    defaultLang: { script: 'ts' }, // Ensures TypeScript is recognized
    template: { optimizeSSR: false } // Handle SSR if not necessary
  }),
  scss(),
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: true,
    declaration: false,  // Don't generate declaration files in Rollup build
    allowJs: true        // Allow JavaScript files (since we are mixing JS and TS)
  }),
];

export default async function(){
  return [
    ...glob.sync('src/index.ts').map(c=>bundle(c, outputDir, o=>"index")),
    ...glob.sync('src/components/**/*.{ts,vue}').map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.(ts|vue)$/i, "$1"))),
    ...glob.sync('src/services/**/*.{js,ts}').map(c=>bundle(c, outputDir, (o)=>o.replace(/^src\/(.*)\.(js|ts)$/i, "$1"))),
    ...glob.sync('src/assets/**/*.css').map(c=>bundle(c, outputDir, o=>o.replace(/^src\/(.*)\.css$/i, "$1"))),
  ];
}

function bundle(input, outDir, getFilename ) {
  let ext = path.extname(input);
  let filename = path.basename(input, ext);
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
    plugins: [
      alias({ entries : [
        { find: /^cdn!(.*)/,  replacement:`${cdnUrl}$1` },
      ]}),
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

