# Base.js

The `Base` class serves as a fundamental building block within the ToolX library. It provides basic functionalities and utilities common to various components of the library. Below is a comprehensive overview of the `Base` class.

## Class Overview

`Base` is a foundational class designed to be extended by other classes in the ToolX library. It encapsulates common properties and methods that are useful across different tools and components.

### Properties

- `debug`: A boolean property indicating whether debug mode is active. When set to `true`, additional log information may be output to the console.

### Methods

#### `constructor(options, pathIn, pathOut)`

The constructor initializes a new instance of the `Base` class. 

- `options`: An optional parameter for configuration options.
- `pathIn`: An optional string or array of strings indicating the input path(s).
- `pathOut`: An optional string indicating the output path.

#### `getID()`

Returns the current ID as a number. This ID is used internally for tracking instances.

#### `getUID()`

Generates and returns a unique ID for the instance. This is useful for creating unique identifiers for instances of derived classes.

#### `static getExt(file)`

A static method that returns the file extension of a given file.

- `file`: A string representing the filename.

#### `static checkFileExt(file, exts)`

Checks if a given file has one of the specified extensions.

- `file`: The file name as a string.
- `exts`: An array of string extensions to check against.

#### `includes(arr, value)`

Determines if a given value is included in an array.

- `arr`: An array of strings.
- `value`: A string value to check for inclusion in the array.

#### `excludes(arr, value)`

Determines if a given value is excluded from an array.

- `arr`: An array of strings.
- `value`: A string value to check for exclusion from the array.

#### `exact(inputValue, fileValue)`

Checks if two values are exactly the same.

- `inputValue`: A string value to compare.
- `fileValue`: Another string value to compare against the first.

#### `set(options, pathIn, pathOut)`

Configures the instance with specified options and paths.

- `options`: Configuration options.
- `pathIn`: Input path(s) as a string or an array of strings.
- `pathOut`: Output path as a string.

#### `log(args)`

Outputs log information to the console if debug mode is active.

- `args`: Variable number of arguments to log.

## Usage Example

```javascript
import Base from 'path-to-Base.js';

// Creating an instance of the Base class
const baseInstance = new Base({ debug: true }, 'input/path', 'output/path');

// Working with the instance
console.log(baseInstance.getID());
```

In this example, an instance of the `Base` class is created with debug mode enabled, input and output paths specified. The `getID` method is then called to demonstrate its usage.

---

This documentation provides an essential guide to the `Base` class, a core component of the ToolX library.
