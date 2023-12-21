# ToolJSON

`ToolJSON.js` is an integral component of the ToolX library, primarily focused on handling and optimizing JSON files. Its main function, as of now, is to rewrite JSON files in a minified format, thereby reducing their size for more efficient storage and transfer. This tool is particularly effective when used within a pipeline, where it often serves as a final step to compress and minify all JSON files following processing by other tools. This makes it a vital asset in workflows where multiple JSON files are generated and need to be optimized for space.

:::note
While ToolJSON.js currently excels in file native compression, plans are underway to expand its functionality. Future updates may introduce additional features to further enhance its utility in JSON file manipulation and processing.
:::

## Functionality

- **File Compression**: Compresses and minifies JSON files to reduce file size without altering their data structure or content.

## Usage

### Importing ToolJSON

```js
import ToolJSON from '@toolx/json';
```

### Direct Usage

```js
const toolJson = new ToolJSON();

// Example usage for compressing a JSON file
toolJson.run(options, inputFilePath, outputFilePath).then(() => {
    console.log('JSON file compression complete');
});
```

### Usage in Pipeline

```js
import { Pipeline } from '@toolx/core';
import ToolJSON from '@toolx/json';
import ToolOther from '@toolx/other'; // Example of another tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolJSON()
);

// Running the pipeline for JSON compression
pipeline.run(options, inputFolderPath, outputFolderPath).then(() => {
    console.log('JSON processing complete');
});
```

## Options

`ToolJSON` operates efficiently without the need for specific options, automatically handling the compression of JSON files.
