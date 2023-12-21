# ToolRemove

`ToolRemove.js` is a specialized component of the ToolX library, designed for file and directory removal operations.

#### Example Usage

```js
import ToolRemove from '@toolx/remove';

const run = async () => {
    const tool = new ToolRemove({}, [`${process.cwd()}/**/*.d.ts`, `!**/node_modules`])
    await tool.run();
}

run();
```

## Usage in Pipeline

This tool can be integrated into a pipeline for automated file removal tasks.

```js
import { Pipeline } from '@toolx/core';
import ToolRemove from '@toolx/tool-remove';
import ToolOther from '@toolx/other'; // Example of another tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolRemove({}, '**/*.json')
);

// Running the pipeline
pipeline.run(options, inputPath, outputPath).then(() => {
    console.log('File removal in pipeline complete');
});
```