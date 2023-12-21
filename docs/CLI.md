# ToolX CLI Usage Documentation

## Overview

ToolX provides a versatile Command Line Interface (CLI) for utilizing its tools and pipelines. The CLI interface leverages `mustargs`, a custom [library](https://github.com/toolx-dev/mustargs) developed specifically for ToolX, to parse command line arguments into JavaScript objects. This functionality is crucial for handling array support and nested objects used in tool options.

## Key Features

- **Argument Parsing**: Converts CLI arguments into structured JS objects, supporting arrays and nested objects for tool options.
- **Tool Execution**: Facilitates the execution of individual tools within the ToolX library via command line.
- **Pipeline Execution**: Allows for the running of predefined pipelines with custom options and paths.

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
toolx --tool sharp --options api.blur=5 -i /yourpath/yourfile.ext -o /your-output-folder
```

This command runs the `sharp` tool with a blur option set to `5`, processing a file from the specified input path and outputting the result to the given output folder.

### Key Components

- **Path Resolution**: Input and output paths are resolved, with the output path defaulting to the directory of the input file if not explicitly provided.
- **Tool Import and Execution**: If a tool is specified, it's dynamically imported and executed with the provided options and paths.

## Future Enhancements

While the current CLI interface provides robust functionality, future enhancements may include more advanced argument parsing capabilities, better error handling, and support for additional command line options.

---

This documentation provides a comprehensive guide to using the ToolX CLI, making it easier for users to leverage the full potential of the ToolX library directly from the command line.
