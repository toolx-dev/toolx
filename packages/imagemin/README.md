# ToolImagemin Documentation

`ToolImagemin.js` is a part of the ToolX library, specifically designed for efficient image compression. It leverages the capabilities of the `imagemin` library to compress various image formats. This document outlines its functionalities, including options for compression and provides usage examples.

::: info
This tool uses the `imagemin` library, which is a powerful and flexible image compression library. It supports a variety of image formats and provides extensive options for customization. For more details on `imagemin`, visit [imagemin on npm](https://www.npmjs.com/package/imagemin).
:::

## Props

`ToolImagemin` offers several options to customize the image compression process. These options allow for specific file extensions, inclusion and exclusion criteria, and detailed settings for JPG and PNG files.

### File Extensions and Filters

- `exts`: Specify the file extensions to target for compression.
- `includes`: Define patterns or strings to include certain files.
- `excludes`: Define patterns or strings to exclude certain files.

### JPG Compression Settings

- `progressive`: Enable or disable progressive rendering for JPG files.
- `arithmetic`: Use arithmetic coding for JPG files.

### PNG Compression Settings

- `speed`: Set the compression speed for PNG files.
- `strip`: Remove ancillary chunks from PNG files.
- `quality`: Define the quality range for PNG compression.
- `dithering`: Apply dithering to PNG images.
- `posterize`: Reduce the number of colors in PNG images.

## Usage

### Example: Compressing JPG and PNG Images

```js
import ToolImagemin from '@toolx/image-compress';

// Example configuration
const compressOptions = {
    exts: ['jpg', 'png'],
    includes: ['*'],
    excludes: ['*.gif'],
    jpg: {
        progressive: true,
        arithmetic: false
    },
    png: {
        speed: 4,
        strip: true,
        quality: [0.6, 0.8],
        dithering: 0.5,
        posterize: 4
    }
};

// Creating an instance of ToolImagemin
const imageCompressor = new ToolImagemin(compressOptions);

// Compressing images
imageCompressor.run(inputPath, outputPath).then(() => {
    console.log('Image compression complete');
});
```

In this example, `ToolImagemin` is configured to compress both JPG and PNG files, with specific settings for each format. It will include all files but exclude GIFs. The process involves creating an instance of `ToolImagemin` with the desired options and then running the compression.
