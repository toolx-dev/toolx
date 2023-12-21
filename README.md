<p align="center">
  <a href="https://www.npmjs.com/package/@toolx/core" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://avatars.githubusercontent.com/u/154528565?s=200&v=4" alt="ToolX logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@toolx/core"><img src="https://img.shields.io/npm/v/@toolx/core" alt="npm package"></a>
</p>
<br/>


# ToolX

ToolX is structured around two core concepts: `Tool` and `Pipeline`.
It offers a unified method for file processing through various methods such as media compression, transformation, etc. It enables the export of processed files. Pipelines in ToolX allow the integration of multiple tools where the output of one tool serves as the input for the next.

## Quick CLI Usage

ToolX can be quickly used via the CLI with the `npx` command. For example:

```bash
npx @toolx/combine
```

Or, after installing a tool globally, 

```bash
npm i @toolx/combine -g
```

you can directly use it in the CLI:

```bash
toolx-combine
```

In both methods, input files are taken from the current directory, and results are saved in the same directory. You can change the input folder, output folder, and options using the `--options`, `-i`, and `-o` parameters. More details can be found [here](https://github.com/toolx-dev/toolx/blob/main/docs/CLI.md).

## CLI Wizard (Work in Progress)

ToolX also offers a CLI wizard for a guided usage of all library tools. This method can be accessed by using `@toolx/cli` and is currently under development, so future changes are expected.

## Using ToolX in Code

ToolX can be installed using npm for direct code usage. For example:

```javascript
import ToolSharp from "@toolx/sharp";

const tool = new ToolSharp(
    { api: { png: true }, ext: '.png'},
    `${process.cwd()}/in/**/*`,
    `${process.cwd()}/out/`
);
tool.run();
```

Details on creating a tool and further information are available [here](https://github.com/toolx-dev/toolx/blob/main/docs/TheTool.md). Remember to refer to the input path pattern using fast-glob syntax, detailed [here](https://github.com/toolx-dev/toolx/blob/main/docs/FastGlobPatternSyntax.md).

## Combining Tools with Pipeline

Tools can be combined using Pipeline, where the output of one tool becomes the input for the next. For instance, a tool to transform an image format, followed by composing the image into a spritesheet, and finally compressing it. More about Pipeline can be found [here](https://github.com/toolx-dev/toolx/blob/main/docs/PipelineInsight.md).

## Future Implementations

Plans include web-based usage and an app to support the project financially, expected by the first half of 2024.

For more information, visit the ToolX GitHub project page: [ToolX on GitHub](https://github.com/toolx-dev).


## Overview

This documentation provides an overview of how to use ToolX's `Tool` and `Pipeline` components effectively.


- **Tool**: Represents an individual utility focused on a specific task, such as file transformation, data processing, etc.
- **Pipeline**: A sequence of `Tool` instances, arranged to form a workflow for processing data through multiple stages.

## Using Tools

Each `Tool` in ToolX is a standalone module with its own set of functionalities.

### Argument Structure for Tools

When invoking the `run` method of a ToolX tool, the arguments are typically as follows:

1. **Options**: An object containing configuration settings for the tool. These settings vary depending on the tool's functionality.
2. **Input Path**: The path to the files or data to be processed. This supports `fast-glob` patterns, allowing the tool to handle multiple files.
3. **Output Path**: The destination path for the processed files or data.

### Example: ToolSvg

`ToolSvg` is used for SVG file optimization. It leverages the SVGO library for this purpose.

```javascript
import ToolSvg from '@toolx/svg';

// Initialize the tool with options
const toolSvg = new ToolSvg({
    settings: {
        // SVGO settings
        floatPrecision: 3,
        transformPrecision: 3,
        multipass: true,
    }
});

// Run the tool
toolSvg.run(options, inputPath, outputPath).then(() => {
    console.log('SVG optimization complete');
});
```

### Example: Custom pipeline
In this example, we demonstrate the creation of a custom pipeline using the ToolX library. The pipeline integrates two tools: `ToolSharp` and `ToolSvg`.


```javascript
import { Pipeline } from '@toolx/core';
import ToolSharp from '@toolx/sharp';
import ToolSvg from '@toolx/svg';

// Initialize the pipeline with optional configurations
const pipeline = new Pipeline();

// Compose the pipeline with desired tools
// ToolSharp for image processing and ToolSvg for SVG optimization
pipeline.compose(
    new ToolSharp({
        // ToolSharp specific options
    }),
    new ToolSvg({
        // ToolSvg specific options
    })
);

// Prepare options for pipeline execution
const executionOptions = {
    // General options for the entire pipeline
};

// Execute the pipeline with input and output paths
pipeline.run(executionOptions, inputPath, outputPath).then(() => {
    console.log('Custom pipeline processing complete');
});

```

## Conclusion

ToolX provides a flexible and powerful system for handling various file manipulation and processing tasks. By understanding how to use individual `Tool` instances and combining them into `Pipeline` workflows, you can efficiently manage complex data processing tasks.

For more detailed information on individual tools and pipelines, refer to the respective documentation.
