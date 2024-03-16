
# ToolSharp Documentation

`ToolSharp` is a part of the ToolX library, focusing specifically on image processing and manipulation. It leverages the `sharp` library, known for its efficiency and robust capabilities in handling image transformations. `ToolSharp` provides a user-friendly interface to access the advanced features of `sharp`, making it a go-to solution for image-related tasks in the ToolX environment.

::: tip
`ToolSharp` excels in image manipulation and conversion, offering a wide range of customization options. Its integration with the `sharp` library ensures high performance and quality results in various image processing tasks.
:::

## Options

`ToolSharp` comes with a comprehensive set of options that allow users to control different aspects of image processing:

### General Options

- **`settings`**: Configure the sharp class options.
- **`ext`**: Set the output file extension.
- **`scale`**: Configure the image scale.
- **`exts`**: Specify allowed file extensions.
- **`api`**: Access sharp library features.

### Image Processing Options

- **`resize`**: Adjust image dimensions.
- **`rotate`**: Rotate the image.
- **`flip`**: Flip the image vertically.
- **`flop`**: Flip the image horizontally.
- **`sharpen`**: Sharpen the image.
- **`threshold`**: Apply image binarization.
- **`composite`**: Overlay images.
- **`toFormat`**: Set output format.
- **`jpeg`**: JPEG-specific options.
- **`png`**: PNG-specific options.
- **`webp`**: WebP-specific options.
- **`avif`**: AVIF-specific options.
- **`heif`**: HEIF-specific options.
- **`tiff`**: TIFF-specific options.
- **`gif`**: GIF-specific options.
- **`jp2`**: JPEG 2000 options.
- **`jxl`**: JPEG XL options.
- **`raw`**: RAW format options.
- **`tile`**: Image tiling options.
- **`removeAlpha`**: Remove alpha channel.
- **`ensureAlpha`**: Ensure alpha channel.
- **`extractChannel`**: Extract a color channel.
- **`joinChannel`**: Join channels to the image.
- **`bandbool`**: Apply a boolean operation.
- **`tint`**: Tint the image.
- **`greyscale`/`grayscale`**: Convert to greyscale.
- **`pipelineColourspace`/`pipelineColorspace`**: Set pipeline colorspace.
- **`toColourspace`/`toColorspace`**: Set output colorspace.
- **`affine`**: Perform affine transformation.
- **`median`**: Apply a median filter.
- **`blur`**: Blur the image.
- **`flatten`**: Merge alpha channel.
- **`gamma`**: Apply gamma correction.
- **`negate`**: Create a negative image.
- **`normalise`/`normalize`**: Enhance contrast.
- **`clahe`**: Adaptive histogram equalization.
- **`convolve`**: Convolve with a kernel.
- **`recomb`**: Recombine using a matrix.

## Usage Examples

### Basic Usage

```javascript
import ToolSharp from '@toolx/core';

// Example usage
const toolSharp = new ToolSharp({
    ext: 'jpg',
    scale: 1.5,
    api: {
        resize: { width: 300, height: 200 },
        rotate: 90,
        sharpen: true,
        // Other sharp options
    }
});

// Run the tool
toolSharp.run(inputFilePath, outputFilePath).then(() => {
    console.log('Image processing complete');
});
```

### Advanced Usage in a Pipeline

```javascript
import { Pipeline } from '@toolx/core';
import ToolSharp from '@toolx/sharp';
import ToolOther from '@toolx/other'; // Another ToolX tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolSharp({
        ext: 'png',
        scale: 2,
        api: {
            resize: { width: 600 },
            flip: true,
            toFormat: 'png',
            // Other sharp options
        }
    })
);

// Run the pipeline
pipeline.run(inputPath, outputPath).then(() => {
    console.log('Image processing pipeline complete');
});
```

### Sharp Library Integration

`ToolSharp` integrates with the `sharp` library for most of its image processing capabilities. For detailed information on the `sharp` library and its options, visit [sharp documentation](https://sharp.pixelplumbing.com/).
