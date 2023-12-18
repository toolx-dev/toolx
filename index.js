#!/usr/bin/env node

import { toCamelCase } from '@toolx/core/utils.js';
import path from 'node:path'
import mustargs from 'mustargs'

const args = mustargs(process.argv.slice(2));

let pathIn = args.pathIn || args.i;
let pathOut = args.pathOut || args.o;
const options = args.options || args.opts || args.s;
const tool = args.tool || args.t;
const pipeline = args.pipeline || args.p;
const help = args.help || args.h;

pathIn = pathIn;
pathOut = pathOut || path.dirname(pathIn);

if (tool) {
    import(`./packages/tool-${tool}/Tool${toCamelCase(tool, true)}.js`).then((_tool) => {
        new _tool.default().run(options, pathIn, pathOut);
    });
} else if (pipeline) {
    import('@toolx/core').then(({ Pipeline }) => {
        const pipelineFn = new Pipeline(options, pathIn, pathOut);
        import(pipeline).then((listTools) => {
            pipelineFn.compose(...listTools.default().filter(e => e))()
        });
    })
} else if (help) {

}