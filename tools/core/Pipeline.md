# Pipeline.js

`Pipeline.js` is an integral part of the ToolX library, designed to facilitate the creation and execution of sequential processing tasks. This document provides a detailed overview of its functionalities along with usage examples.

## Class Overview

The `Pipeline` class, extending `Base`, allows for chaining multiple operations (tools or functions) to process data in a sequential and organized manner.

#### `compose(...fns)`

Composes multiple functions or tools into a single pipeline. Each function or tool is executed in the order provided.

- `fns`: A list of functions or tools to be composed into the pipeline.

##### Example

```javascript
const composedPipeline = pipelineInstance.compose(tool1, tool2, tool3);
```

### Simple Use Example

```javascript
import { Pipeline } from 'path-to-Pipeline.js';
import ToolA from 'path-to-ToolA.js';
import ToolB from 'path-to-ToolB.js';

// Creating a simple pipeline with two tools
const simplePipeline = new Pipeline();
simplePipeline.compose(ToolA, ToolB);
```

# Exhaustive Example of Nested Pipeline Usage

This example demonstrates a complex use case of nested pipelines, similar to what's found in the `pipelineIcons.js` file, but in a more generic context. The example showcases how nested pipelines can be used to process and transform files in various ways.

```javascript
import { Pipeline } from 'path-to-Pipeline.js';
import ToolA from 'path-to-ToolA.js';
import ToolB from 'path-to-ToolB.js';
import ToolC from 'path-to-ToolC.js';

function runComplexPipeline(options, pathIn, pathOut) {
    // Main pipeline for overall processing
    const mainPipeline = new Pipeline(options, pathIn, pathOut);

    // Nested pipeline for specific tasks, e.g., handling SVG files
    const svgPipeline = new Pipeline(options, pathIn, 'path/to/svg/output');
    
    // Another nested pipeline, e.g., for image processing
    const imagePipeline = new Pipeline(options, pathIn, 'path/to/image/output');

    // Composing the main pipeline with nested pipelines and tools
    mainPipeline.compose(
        // First nested pipeline for SVG processing
        svgPipeline.compose(
            ToolA({ settingA: 'valueA' }), // ToolA for SVG manipulation
            ToolB({ settingB: 'valueB' })  // ToolB for additional SVG processing
        ),

        // Second nested pipeline for image processing
        imagePipeline.compose(
            ToolC({ settingC: 'valueC' }), // ToolC for initial image processing
            ToolA({ settingA: 'valueA' })  // Reusing ToolA for further image manipulation
        )
    );

    // Running the composed main pipeline
    return mainPipeline.run();
}

runComplexPipeline({ someOption: 'example' }, 'input/path', 'output/path')
  .then(() => console.log('Pipeline execution complete'))
  .catch((error) => console.error('Error in pipeline execution', error));
```

In this example, `runComplexPipeline` sets up a main pipeline and two nested pipelines. The main pipeline orchestrates the overall process, while the nested pipelines focus on specific tasks, like handling SVG files in `svgPipeline` and processing images in `imagePipeline`. Each pipeline is composed of different tools (`ToolA`, `ToolB`, `ToolC`), configured with specific settings. The example demonstrates the flexibility and power of nested pipelines in handling complex file processing tasks.

---

This documentation provides a thorough understanding of the `Pipeline.js` class and its usage within the ToolX library.
