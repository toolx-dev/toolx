#!/usr/bin/env node
import { select, input } from '@inquirer/prompts';
import confirm from '@inquirer/confirm';
import { Pipeline } from '@toolx/core';
import mustargs from 'mustargs';
import fs from 'node:fs';
import path from 'node:path';

(async () => {
    const packageFile = JSON.parse(fs.readFileSync('../../package.json'));
    const packagesChoices = packageFile.workspaces.filter(e => e !== 'packages/cli' && e !== 'packages/core').map((packageItem) => {
        const item = JSON.parse(fs.readFileSync(path.resolve('../../', packageItem, 'package.json')));
        return {
            name: item.name.replace('@toolx/', ''),
            description: item.description,
            value: item.name.replace('@toolx/', '')
        }
    })


    const options = await input({ message: 'Options:' });
    const pathIn = await input({ message: 'Input paths:' });
    const pathOut = await input({ message: 'Output path:' });

    const _options = mustargs(['--options', ...options.split(' ')]).options;

    const isTool = await confirm({ message: 'Continue with a tool?' });

    if (!isTool) {
        const isPipeline = await confirm({ message: 'Continue with a tool?' });
        if (isPipeline) {
            const pipelineUrl = await input({ message: 'Url of the pipeline:' });
            import(pipelineUrl).then((listTools) => {
                const pipelineFn = new Pipeline(_options, pathIn, pathOut);
                pipelineFn.compose(...listTools.default().filter(e => e))()
            })
        }
    } else {
        const toolName = await select({
            message: 'Pick a tool',
            choices: packagesChoices,
        });

        import(`@toolx/${toolName}`).then((_tool) => {
            new _tool.default().run(_options || {}, pathIn, pathOut);
        });
    }
})();
