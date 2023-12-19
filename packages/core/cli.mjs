#!/usr/bin/env node

import { toCamelCase } from '@toolx/core/utils.js';
import { getArgsFromCLI } from '@toolx/core/utils.server.js'

const { options, pathIn, pathOut, ...args } = getArgsFromCLI();

const tool = args.tool || args.t;
const pipeline = args.pipeline || args.p;

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
} else {
    console.log('Declare tool or pipeline, ex: toolx --tool svg')
}