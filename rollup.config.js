// rollup.config.js (building more than one bundle)
import path  from 'path'
import vue   from 'rollup-plugin-vue'
import glob  from "glob";
import buble from '@rollup/plugin-buble';
import { camelCase } from 'lodash'
import {
  name as packageName,
  peerDependencies,
} from './package.json';

const sourcemap = true;
const outputDir = 'dist';
const external  = [ ...Object.keys(peerDependencies||{}) ];
const outputFormats = {
  'umd' : '.js',
  'esm' : '.mjs',
  'cjs' : '.cjs',
}
const plugins = [ vue(), buble() ];

export default async function(){
  return [
    ...glob.sync('src/index.js'              ).map(c=>bundle(c, outputDir)),
    ...glob.sync('src/components/**/index.js').map(c=>bundle(c, path.join(outputDir, 'components'), /^src\/components\/(.*)\/index\.js$/i)),
    ...glob.sync('src/services/**/index.js'  ).map(c=>bundle(c, path.join(outputDir, 'services'),   /^src\/services\/(.*)\/index\.js$/i)),
  ];
}

function bundle(input, outDir, filenameRe ) {
  let ext      = path.extname (input);
  let filename = path.basename(input, ext);

  if(filenameRe) {
    filename = input.replace(filenameRe, "$1");
  }

  const filePath = path.join(outDir, filename);
  const exports  = 'auto';
  const name     = pascalCase(`${packageName}_${filename.replace(/[^a-z0-9]/ig, "_")}`);
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

