# ToolX

Welcome to the ToolX Library, a versatile toolkit designed for efficient file manipulation and processing. This documentation provides an overview of how to use ToolX's `Tool` and `Pipeline` components effectively.

## Overview

ToolX is structured around two core concepts: `Tool` and `Pipeline`.

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
## Using Pipelines

A `Pipeline` in ToolX is a way to combine multiple tools to create a complex workflow. Here's how you can set up and use a pipeline:

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
