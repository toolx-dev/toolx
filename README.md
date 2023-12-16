# ToolX

Welcome to the ToolX Library, a versatile toolkit designed for efficient file manipulation and processing. This documentation provides an overview of how to use ToolX's `Tool` and `Pipeline` components effectively.

## Overview

ToolX is structured around two core concepts: `Tool` and `Pipeline`.

- **Tool**: Represents an individual utility focused on a specific task, such as file transformation, data processing, etc.
- **Pipeline**: A sequence of `Tool` instances, arranged to form a workflow for processing data through multiple stages.

## Using Tools

Each `Tool` in ToolX is a standalone module with its own set of functionalities. Here's a general guide on how to use a `Tool`:

### Example: ToolSvg

`ToolSvg` is used for SVG file optimization. It leverages the SVGO library for this purpose.

```javascript
import ToolSvg from '@toolx/tool-svg';

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
import ToolSharp from '@toolx/tool-sharp';
import ToolSvg from '@toolx/tool-svg';

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

### Example: PipelineIcons

`PipelineIcons` is a complex pipeline for handling icon-related tasks, integrating tools like `ToolIcons`, `ToolFont`, and `ToolSvg`.

```javascript
import runPipeline from '@toolx/pipeline-icons';

// Configuring the pipeline
const options = {
    // Pipeline specific options
};

// Execute the pipeline
runPipeline(options, inputPath, outputPath).then(() => {
    console.log('Icon pipeline processing complete');
});
```

### Process Flow

The `PipelineIcons` involves several steps, including SVG optimization, font generation, and more.

## Conclusion

ToolX provides a flexible and powerful system for handling various file manipulation and processing tasks. By understanding how to use individual `Tool` instances and combining them into `Pipeline` workflows, you can efficiently manage complex data processing tasks.

For more detailed information on individual tools and pipelines, refer to the respective documentation.
