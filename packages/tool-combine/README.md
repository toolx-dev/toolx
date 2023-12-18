# ToolCombine

`ToolCombine.js` is a specialized component of the ToolX library, designed to combine multiple images into RGB channel-based composite images. This tool uniquely maps each image to a specific color channel - red, green, or blue.

:::note
`ToolCombine` does not provide configurable options and operates on a fixed process of mapping images to RGB channels. The first image is mapped to the red channel, the second to the green, and the third to the blue channel. Subsequent groups of images follow the same pattern.
:::

## Process

The tool captures a minimum of one to a maximum of three images and combines each into the RGB channels of a single image. For example:
- The first image is assigned to the red channel.
- The second image is assigned to the green channel.
- The third image is assigned to the blue channel.

If more than three images are provided, they are grouped and merged into multiple output files. For instance, with seven images, the process results in three combined images: the first two images comprise all three RGB channels, and the last image is mapped only to the red channel.

## Usage

### Direct Usage

```js
import ToolCombine from '@toolx/tool-combine';

// Example usage with an array of image paths
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', /* more images */];
const toolCombine = new ToolCombine();

// Running the tool
toolCombine.run(images).then((combinedImages) => {
    console.log('Images combined into RGB channels:', combinedImages);
});
```

### Usage in Pipeline

In a pipeline, `ToolCombine` can be used in conjunction with other image processing tools from the ToolX library. However, the tool's unique RGB channel combination feature remains the same.

```js
import { Pipeline } from '@toolx/core';
import ToolCombine from '@toolx/tool-combine';
import ToolOther from '@toolx/tool-other'; // Example of another tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolCombine()
);

// Running the pipeline with an array of image paths
pipeline.run(images).then(() => {
    console.log('Pipeline with image combining complete');
});
```

:::caution
Ensure the correct number and order of images are provided to achieve the desired RGB channel mapping.
:::
