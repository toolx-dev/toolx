# Tool.server.js

`Tool.server.js` is a key component of the ToolX library, specialized in directory operations and file manipulation. This document offers a detailed guide to its capabilities and usage examples for each static method.

## Class Overview

The `Tool` class, inheriting from the `Base` class, provides methods for directory and file management.

### Methods

#### `static async createDir(dirPath)`

Creates a directory if it doesn't exist.

- `dirPath`: The path of the directory to create.

##### Example

```javascript
await Tool.createDir('/path/to/new/dir');
```

#### `static async exist(path)`

Checks if a path exists.

- `path`: The path to check.

##### Example

```javascript
const exists = await Tool.exist('/path/to/check');
```

#### `static changeExt(file, ext)`

Changes the extension of a file.

- `file`: The file whose extension is to change.
- `ext`: The new extension.

##### Example

```javascript
const newFilePath = Tool.changeExt('example.txt', '.md');
```

#### `static removeFiles(files)`

Removes multiple files.

- `files`: An array of file paths to remove.

##### Example

```javascript
await Tool.removeFiles(['/path/to/file1.txt', '/path/to/file2.txt']);
```

#### `static removeDir(dirPath)`

Removes a directory and its contents.

- `dirPath`: The path of the directory to remove.

##### Example

```javascript
await Tool.removeDir('/path/to/dir');
```

#### `async run(options, pathIn, pathOut)`

The `run` method is the core function of the `Tool` class. It orchestrates the tool's main operations, managing the processing of files and directories based on the provided options and paths.

- `options`: An object containing configuration options for the tool. These options can vary based on the specific requirements of the task and can include settings related to file handling, processing criteria, and output formatting.
- `pathIn`: This parameter can be either a string or an array of strings, representing the input path(s) for the files to be processed. The method handles these paths to read, manipulate, or copy files as needed.
- `pathOut`: A string indicating the output path where the processed files will be saved or stored. This path is used to direct the output of the tool's operations, ensuring that the results are correctly placed in the desired location.

#### Process Flow

1. **Initialization**: The method begins by setting up event handlers and merging various option objects to form a complete configuration for the tool's operation.
2. **Temporary Path Creation**: For processing, a temporary path is often generated using the `os.tmpdir()` method, which provides a unique temporary directory for the tool's operations.
3. **Directory Creation**: It ensures the creation of necessary directories, both temporary and output, if they do not already exist.
4. **File Copying**: The method may involve copying files from the input paths to the temporary path. This step is crucial for operations that require isolated environments or where the original files should not be modified directly.
5. **Start Event Emission**: An event indicating the start of the process is emitted, which can be used for logging or triggering related actions.
6. **File Processing**: The core processing of files takes place. This can include a wide range of operations like file transformation, data extraction, or any custom processing logic defined in the tool.
7. **Output Generation**: Finally, the method handles the generation of output, which could include copying processed files to the output directory, creating additional data files, or cleaning up temporary files and directories.

#### Example

```javascript
const toolInstance = new Tool();
const options = { /* options for processing */ };
const inputPath = 'path/to/input';
const outputPath = 'path/to/output';

toolInstance.run(options, inputPath, outputPath)
  .then(result => {
    // Handle the result of the processing
  })
  .catch(error => {
    // Handle any errors that occurred during processing
  });
```

#### `async process(files, pathIn, pathOut)`

Processes files.

- `files`: Array of file paths.
- `pathIn`: Input path.
- `pathOut`: Output path.

---

This documentation offers comprehensive insights into the `Tool.server.js` class, a vital part of the ToolX library.
