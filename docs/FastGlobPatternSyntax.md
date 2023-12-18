# Fast-Glob Pattern Syntax

`fast-glob` is a powerful and efficient library for matching file paths against specified patterns, integrated within ToolX for file manipulation and searching. It uses a specific pattern syntax to define the criteria for matching file paths.

:::tip
The `fast-glob` library is used in ToolX to provide flexible and efficient file matching capabilities. It's crucial for operations that require pattern matching against file paths, such as filtering or searching files.
:::

## Pattern Syntax

`fast-glob` uses glob pattern syntax, which allows for flexible and expressive file path matching. The syntax includes:

- **`*` (Wildcard)**: Matches any number of characters (excluding directory separators).
- **`**` (Globstar)**: Matches any number of characters (including directory separators).
- **`?` (Single Character)**: Matches any single character (excluding directory separators).
- **`[seq]` (Character Set)**: Matches any character in `seq`.
- **`!(pattern)` (Negation)**: Matches anything except the specified `pattern`.
- **`@(pattern)` (Match Pattern)**: Matches the specified `pattern`.
- **`+(pattern)` (One or More)**: Matches one or more occurrences of the specified `pattern`.
- **`*(pattern)` (Zero or More)**: Matches zero or more occurrences of the specified `pattern`.
- **`?(pattern)` (Optional)**: Matches zero or one occurrence of the specified `pattern`.
- **`{a,b}` (Alternatives)**: Matches either `a` or `b`.

## Usage in ToolX

When using `fast-glob` within ToolX, patterns are passed to functions that involve file searching or manipulation. Here's an example showing how `fast-glob` is used in ToolX to filter files:

### Example

```js
import { Tool } from '@toolx/core';

// Example usage
const tool = new Tool(['*.js', '!test.*']);
tool.run();
```

In this example, uses `fast-glob` patterns to include all `.js` files but exclude those named `test.*`.

### External Library: `fast-glob`

`fast-glob` is an external library integrated into ToolX. It provides advanced pattern matching capabilities that are essential for various file manipulation tasks. For more information on `fast-glob` patterns and usage, refer to the [fast-glob documentation](https://github.com/mrmlnc/fast-glob#pattern-syntax).
