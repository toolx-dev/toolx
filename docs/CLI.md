# ToolX CLI Usage Documentation

## Overview

ToolX provides a versatile Command Line Interface (CLI) for utilizing its tools and pipelines. The CLI interface leverages `mustargs`, a custom [library](https://github.com/toolx-dev/mustargs) developed specifically for ToolX, to parse command line arguments into JavaScript objects. This functionality is crucial for handling array support and nested objects used in tool options.

## Basic Usage

### Command Structure

```sh
toolx-<toolName> --options <optionsObject> -i <inputPath> -o <outputPath>
```

- `--options`: Provides the options for the tool in a nested object format.
- `-i` or `--pathIn`: Defines the input path.
- `-o` or `--pathOut`: Sets the output path.

### Example Command

```sh
toolx-sharp --options api.blur=5 -i /yourpath/yourfile.ext -o /your-output-folder
```

This command runs the `sharp` tool with a blur option set to `5`, processing a file from the specified input path and outputting the result to the given output folder.

## Quickly

You can quickly start via the `npx` command. This tool is convenient as it does not require a global installation and can be run directly with the following command:

```bash
npx @toolx/imagemin your/input/path/filename.ext
```

This command will process the input image located at `your/input/path/filename.ext` and replace it with the optimized version.

### Specifying Output Path

If you want to save the files to a specific output path without replacing the original, you can use a second parameter to set the desired output directory:

```bash
npx @toolx/imagemin your/input/path/filename.ext your/output/path/
```

With this command, the `filename.ext` will be processed and saved in `your/output/path/` directory.

::: tip
For a faster and more streamlined experience, you can use quick commands like `toolx-imagemin` without specifying input or output paths. This approach processes all applicable files within the current directory and its subdirectories, applying default or specified options to each file.
:::
