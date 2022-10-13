// rollup.config.js (building more than one bundle)
import path  from 'path'
import vue   from 'rollup-plugin-vue'
import glob  from "glob";
import buble from '@rollup/plugin-buble';
import { camelCase } from 'lodash'
import {
  name as packageName,
  type as packageType,
  peerDependencies,
} from './package.json';

const sourcemap = true;
const outputDir = 'dist';
const external  = [ ...Object.keys(peerDependencies||{}) ];
const outputFormats = {
  'umd' : '.umd.js',
  'esm' : packageType=='module' ? '.js' : '.mjs',
  'cjs' : packageType!='module' ? '.js' : '.cjs',
}
const plugins = [ vue(), buble() ];

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
  const exports  = 'auto';
  const name     = pascalCase(`${packageName}_${subPackageName}`.replace(/[^a-z0-9]/ig, "_"));
  const output   = Object.keys(outputFormats).map(format=>({
    name,
    format,
    exports,
    sourcemap,
    file: `${filePath}${outputFormats[format]}`,
  }))

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

