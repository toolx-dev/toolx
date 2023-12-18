# ToolSvg

`ToolSvg.js` is a specialized component of the ToolX library, focused on SVG file manipulation and optimization. Leveraging the capabilities of the SVGO (SVG Optimizer) library, `ToolSvg.js` offers efficient and powerful means to process and optimize SVG files. This document details its functionalities, including how SVGO is utilized for SVG optimization, and provides usage examples both as a standalone tool and within a pipeline.

:::tip
The `ToolSvg` class integrates the SVGO library, a renowned tool for SVG optimization. SVGO employs a variety of optimization techniques to reduce the size of SVG files and improve their performance. The integration with SVGO in `ToolSvg` allows users to take advantage of these optimizations within the ToolX environment, enhancing the efficiency and effectiveness of SVG processing.
:::

## Options

The `ToolSvg` class accepts options to configure its behavior and the SVG optimization process. These options are passed to the `svgo` library.

### `settings` {#settings}

The `settings` option allows customization of various SVG optimization parameters. These are directly passed to the `svgo` library. Some of the settings include:

- `floatPrecision`: Control the precision of floating point numbers.
- `transformPrecision`: Control the precision of transformation expressions.
- `multipass`: Enable or disable multiple optimization passes.

## Usage

### Direct Usage

```js
import ToolSvg from '@toolx/tool-svg';

// Example usage
const toolSvg = new ToolSvg({
    settings: {
        floatPrecision: 5,
        transformPrecision: 5,
        multipass: true,
        // Other svgo settings
    }
});

// Running the tool
toolSvg.run(options, inputFile, outputFile).then(() => {
    console.log('SVG optimization complete');
});
```

### Usage in Pipeline

```js
import { Pipeline } from '@toolx/core';
import ToolSvg from '@toolx/tool-svg';

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolSvg({
        settings: {
            floatPrecision: 3,
            transformPrecision: 3,
            multipass: true,
            // Other svgo settings
        }
    })
);

// Running the pipeline
pipeline.run(options, inputPath, outputPath).then(() => {
    console.log('SVG processing complete');
});
```

### External Library: `svgo`

`ToolSvg` utilizes the `svgo` library for SVG optimization. The settings provided in the `settings` option are used to configure `svgo`. For more information on `svgo` settings, refer to the [svgo documentation](https://github.com/svg/svgo).

