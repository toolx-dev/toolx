# ToolJSON Documentation

## Introduction

`ToolJSON` is a component of the ToolX library designed for the specific purpose of rewriting JSON files into a minified format. This tool is essential for reducing the size of JSON files, making them more efficient for storage and transfer.

::: tip
`ToolJSON` is particularly effective when used within a pipeline in the ToolX library. It's often used as a final step to compress and minify JSON files after they have been processed by other tools, ensuring optimized storage and transfer efficiency.
:::

## Usage

### Direct Usage

In a direct usage scenario, `ToolJSON` can be used to minify a single JSON file or multiple files sequentially. Here's a basic example of how it can be implemented:

```js
import ToolJSON from '@toolx/json';

// Example: Minifying a JSON file
const toolJSON = new ToolJSON();
toolJSON.minify('path/to/input.json', 'path/to/output.json').then(() => {
    console.log('JSON file minified successfully');
});
```

### Usage in Pipeline

`ToolJSON` can also be effectively integrated into a pipeline with other ToolX tools. Here's an example of how `ToolJSON` can be used as the final step in a pipeline to minify JSON files:

```js
import { Pipeline } from '@toolx/core';
import ToolJSON from '@toolx/json';
import ToolOther from '@toolx/other'; // Example of another tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolJSON() // Minify JSON as the final step
);

// Running the pipeline
pipeline.run(inputPath, outputPath).then(() => {
    console.log('Pipeline execution complete, JSON minified');
});
```

## Conclusion

`ToolJSON` is a simple yet powerful tool in the ToolX library, designed to efficiently minify JSON files. Its integration into a pipeline makes it an indispensable tool for optimizing data storage and transfer in applications that handle JSON data.
