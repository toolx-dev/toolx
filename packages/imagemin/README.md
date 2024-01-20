# ToolImagemin Documentation

`ToolImagemin`, is a component of the ToolX library designed for efficient image optimization. This class handles a variety of image formats and employs several optimization strategies to compress images effectively. By providing various options, it allows users to fine-tune the optimization process to their needs.

::: tip
`ToolImagemin` supports both lossless and lossy compression methods and offers detailed configuration options for different formats including PNG, JPEG, and others.
:::

## Options

The `ToolImagemin` accepts an object of `ToolOptions` to configure the optimization process. Below is a description of these options.

### General Options

- `lossless` (boolean): Choose between lossless or lossy compression methods.
- `compression` (number, 0-10): Determine the compression; 10 means high compression.
- `colors` (number, 1-255): Set the number of colors in the image, applies only to PNG format and only in a lossy manner.

::: warning
Pay attention, the active `lossless` parameter refers to configurations that support `lossless`; if not active, they will be `lossy` instead.
The `quality` parameter is an abstraction applicable to all compression libraries; however, for greater control, use the original options of each library.
:::

## Format-Specific Options

### OptiPNGOptions

`OptiPNGOptions` (lossless) is a configuration object used by `ToolImagemin` to set options for optimizing PNG images with the [optipng](https://www.npmjs.com/package/optipng-bin) tool. The following are the properties you can configure, with their explanations and examples:

#### Options

- `o`, `optimization`: Optimization level (0-7).
- `fix`: Enable error recovery.
- `preserve`: Preserve file attributes if possible.
- `filters`: PNG delta filters (0-5).
- `interlaceType`: PNG interlace type (0-1).
- `zlibCompressionLevels`: Zlib compression levels (1-9).
- `zlibMemoryLevels`: Zlib memory levels (1-9).
- `zlibCompressionStrategies`: Zlib compression strategies (0-3).
- `zlibWindowSize`: Zlib window size (256,512,1k,2k,4k,8k,16k,32k).
- `fullReport`: Produce a full report on IDAT.
- `noBitDepthReduction`: No bit depth reduction.
- `noColorTypeReduction`: No color type reduction.
- `noPaletteReduction`: No palette reduction.
- `noReductions`: No reductions.
- `noIDATRecoding`: No IDAT recoding.
- `snip`: Cut one image out of multi-image or animation files.
- `strip`: Strip metadata objects (e.g., "all").

#### Usage Example

```js
const run = new ToolImagemin({
    pngquant: {
        optimization:  7,
        fix:  true,
        preserve:  true,
        filters:  3,
        interlaceType:  2,
        zlibCompressionLevels:  9,
        zlibMemoryLevels:  3,
        zlibCompressionStrategies:  3,
        zlibWindowSize:  512,
        optimization:  7,
        ...
    }
});
```

### PNGQuantOptions

`PNGQuantOptions` (lossy) is a configuration object used by `ToolImagemin` to set options for processing PNG images through the [pnquant](https://www.npmjs.com/package/pngquant-bin) tool. Below are the available properties with their descriptions and usage examples:

#### Options

- `quality`: Don't save below min, use fewer colors below max (0-100).
- `speed`: Speed/quality trade-off. 1=slow, 4=default, 11=fast & rough.
- `nofs`: Disable Floyd-Steinberg dithering. Synonym: `--nofs`.
- `posterize`: Output lower-precision color (e.g. for ARGB4444 output).
- `strip`: Remove optional metadata (default on Mac). Synonym: `--strip`.

#### Usage Example

```js
const run = new ToolImagemin({
    pngquant: {
        quality: '65-80',
        speed:  11,     
        nofs: true,
        posterize: true,   
        strip: false
    }
});
```

### JPEGTranOptions

`JPEGTranOptions` (lossless) is a configuration object used by `ToolImagemin` to set options for processing JPEG images through the [jpegtran](https://www.npmjs.com/package/jpegtran-bin) tool. Below are the available properties with their descriptions and usage examples:

#### Options

- `progressive`: Create progressive JPEG file.
- `optimize`: Optimize Huffman table (smaller file, but slow compression).
- `arithmetic`: Use arithmetic coding for smaller files.
- `copy`: Copy markers (e.g., EXIF, ICC) from input to output. Use `none` to strip all.
- `flip`: Mirror image across horizontal or vertical axis.
- `crop`: Crop source image. Expects a string in the format `WxH+X+Y`.
- `grayscale`: Create a grayscale JPEG.
- `rotate`: Rotate image by 0, 90, 180, or 270 degrees.
- `maxMemory`: Maximum memory to use in kilobytes.
- `revert`: Revert to standard defaults instead of MozJPEG defaults.
- `targa`: Input file is Targa format (usually not needed).
- `trim`: Trim to the MCU block boundary; could result in up to 15 pixels being removed.

#### Usage Example

```js
const run = new ToolImagemin({
    jpegtran: {
        progressive: true,
        optimize: true,
        copy: 'none',
        flip: 'horizontal',
        crop: '640x480+0+0',
        grayscale: true,
        rotate: 90,
        maxMemory: 1024,
        revert: true,
        targa: true,
        trim: true
    }
});
```

### MozJPEG Options

`MozJPEGOptions` (lossy) is a configuration object used by `ToolImagemin` to set options for processing JPEG images through the [mozjpeg](https://www.npmjs.com/package/mozjpeg) tool. Below are the available properties with their descriptions and usage examples.

#### Options

- `quality` (number[]): Compression quality (0-100; 5-95 is most useful range, default is 75).
- `grayscale` (boolean): Create monochrome JPEG file.
- `rgb` (boolean): Create RGB JPEG file.
- `optimize` (boolean): Optimize Huffman table (smaller file, but slow compression, enabled by default).
- `progressive` (boolean): Create progressive JPEG file (enabled by default).
- `baseline` (boolean): Create baseline JPEG file (disable progressive coding).
- `targa` (boolean): Input file is Targa format (usually not needed).
- `revert` (boolean): Revert to standard defaults (instead of mozjpeg defaults).
- `dcScanOpt` (number): DC scan optimization mode.
- `notrellis` (boolean): Disable trellis optimization.
- `trellisDC` (boolean): Enable trellis optimization of DC coefficients (default).
- `tune` (string): Tune trellis optimization.
- `noovershoot` (boolean): Disable black-on-white deringing via overshoot.
- `arithmetic` (boolean): Use arithmetic coding.
- `dct` ('int' | 'fast' | 'float'): DCT method.
- `quantBaseline` (boolean): Use 8-bit quantization table entries for baseline JPEG compatibility.
- `quantTable` (number): Quantization table.
- `restart` (number): Set restart interval.
- `smooth` (number): Smooth dithered input.
- `maxmemory` (number): Maximum memory to use (in kbytes).

#### Usage Example

```js
const optimizer = new ToolImagemin({
    mozjpeg: {
        quality: [75],
        grayscale: false,
        optimize: true,
        progressive: true
    }
});
```

## Usage Example

```js
import ToolImagemin from '@toolx/imagemin';

// Create a new instance of ToolImagemin with desired options
const run = new ToolImagemin({
    lossless: true,
     pngquant: {
        minQuality:  2,
        maxQuality:  100,
        posterize: true,   
        strip: false
    },
    jpegtran: {
        progressive: true,
        optimize: true,
    }
});

run()

```

## External Libraries Used

`ToolImagemin` leverages several external optimization libraries like OptiPNG, PNGQuant, JPEGTran, MozJPEG. Each of these libraries contributes to the image optimization capabilities of `ToolImagemin`.

::: warning
For more details on configurations and advanced options for each format-specific tool, please refer to respective documentation of OptiPNG, PNGQuant, JPEGTran, MozJPEG.
:::
