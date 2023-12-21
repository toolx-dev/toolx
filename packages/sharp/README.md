# ToolSharp

`ToolSharp.js` is an integral component of the ToolX library, focusing on image processing and manipulation. It utilizes the capabilities of the `sharp` library, providing a robust and efficient solution for handling image transformations.

:::tip
The `ToolSharp` class integrates with the `sharp` library, a high-performance Node.js module to convert large images in common formats to smaller, web-friendly JPEG, PNG, and WebP images of varying dimensions.
:::

## Options

The `ToolSharp` class offers various options to customize image processing tasks. These options interface directly with the `sharp` library's features.

### `settings` {#settings}

The `settings` option allows detailed configuration of image processing parameters. Key settings include:

- `resize`: Control the resizing of images.
- `rotate`: Specify rotation angles.
- `flip`: Enable horizontal or vertical flipping of images.
- `sharpen`: Adjust image sharpness.
- `format`: Define the output image format (e.g., JPEG, PNG).

## Usage

### Direct Usage

```js
import ToolSharp from '@toolx/sharp';

// Example usage
const toolSharp = new ToolSharp({
    settings: {
        resize: { width: 300 },
        rotate: 90,
        flip: true,
        sharpen: true,
        format: 'jpeg',
        // Other sharp settings
    }
});

// Running the tool
toolSharp.run(options, inputFile, outputFile).then(() => {
    console.log('Image processing complete');
});
```

### Usage in Pipeline

```js
import { Pipeline } from '@toolx/core';
import ToolSharp from '@toolx/sharp';

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolSharp({
        settings: {
            resize: { width: 600 },
            format: 'png',
            // Other sharp settings
        }
    })
);

// Running the pipeline
pipeline.run(options, inputPath, outputPath).then(() => {
    console.log('Image processing in pipeline complete');
});
```

### External Library: `sharp`

`ToolSharp` leverages the `sharp` library for image processing. For more information on `sharp` settings and capabilities, refer to the [sharp documentation](https://sharp.pixelplumbing.com/).

:::tip
`ToolSharp` is a powerful tool for image manipulation and conversion, offering extensive customization options and high performance.
:::
