# Guide to Using ChatGPT for Efficient and Standardized Documentation Writing

Writing documentation can often be a time-consuming task, especially when aiming for consistency and clarity. ChatGPT, with its advanced language capabilities, can significantly streamline this process. This guide provides advice on how to use ChatGPT to create better, faster, and uniformly standardized documentation.

## Using Custom GPTs for Tool-Specific Documentation

### Accessing Custom GPTs
You can utilize custom GPTs tailored for that purpose. An example of such a custom GPT can be found here: [ToolX Documentation GPT](https://chat.openai.com/g/g-RkCQUt0PH-toolx-documentation). This specialized GPT is designed to understand the context and nuances of ToolX, making it an efficient choice for creating its documentation.

### Creating a New Custom GPT
Or you can create one. Start by instructing the AI with relevant information about your tool. Use the following instruction:

````
ToolX is a powerful library adept in file processing, insightful data extraction, and new file generation through a fluid pipeline of tools. 
When documentation is requested, you should provide an MD file that is downloadable. This documentation must include examples for every static method of the tool being documented.
The documentation should begin with a concise, simplified description of the tool's purpose and functionality. This description must be processed to ensure clarity and simplicity.
The options should be taken from the .d.ts code provided.

Use this rules for highlight:
```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

Prompt can be like this:
```
write downloadable documentation in md format of this tool ToolDemo.js
[description] is a specialized component of the ToolX library, focused on SVG file manipulation and optimization, use svgo external library https://github.com/svg/svgo.

[tip] this class integrates the SVGO library, to reduce the size of SVG files and other improvements 

[options] export type ToolOptions = {
    /**
     * - Options to set the multipass property [default = true].
     */
    multipass?: boolean;
    /**
     * - Options to configure extensions.
     */
    exts?: ['svg'];
    /**
     * - Options to configure sharp library features.
     */
    settings?: ToolSettings;
};
export type ToolSettings = {
    /**
     * - Control the precision of floating point numbers.
     */
    floatPrecision?: number;
    /**
     * - Control the precision of transformation expressions.
     */
    transformPrecision?: number;
};
```

an you need to translate it like the text below:


# ToolSvg

`ToolSvg.js` is a specialized component of the ToolX library, focused on SVG file manipulation and optimization. Leveraging the capabilities of the SVGO (SVG Optimizer) library, `ToolSvg.js` offers efficient and powerful means to process and optimize SVG files. This document details its functionalities, including how SVGO is utilized for SVG optimization, and provides usage examples both as a standalone tool and within a pipeline.

::: tip
The `ToolSvg` class integrates the SVGO library, a renowned tool for SVG optimization. SVGO employs a variety of optimization techniques to reduce the size of SVG files and improve their performance. The integration with SVGO in `ToolSvg` allows users to take advantage of these optimizations within the ToolX environment, enhancing the efficiency and effectiveness of SVG processing.
:::

## Props

The `ToolSvg` class accepts options to configure its behavior and the SVG optimization process. These options are passed to the `svgo` library.

### `settings` {#settings}

The `settings` option allows customization of various SVG optimization parameters. These are directly passed to the `svgo` library. Some of the settings include:

- `floatPrecision`: Control the precision of floating point numbers.
- `transformPrecision`: Control the precision of transformation expressions.

### `options` {#options}

- `multipass`: Enable or disable multiple optimization passes.

## Usage

### Direct Usage

```js
import ToolSvg from '@toolx/svg';

// Example usage
const toolSvg = new ToolSvg({
    multipass: true,
    settings: {
        floatPrecision: 5,
        transformPrecision: 5,
        // Other svgo settings
    }
});

// Running the tool
toolSvg.run(options, inputFile, outputFile).then(() => {
    console.log('SVG optimization complete');
});
```

### Usage in Pipeline

```js
import { Pipeline } from '@toolx/core';
import ToolSvg from '@toolx/svg';
import ToolOther from '@toolx/other'; // Example of another tool

// Setting up the pipeline
const pipeline = new Pipeline();
pipeline.compose(
    new ToolOther(/* ToolOther options */),
    new ToolSvg({
        multipass: true,
        settings: {
            floatPrecision: 3,
            transformPrecision: 3,
            // Other svgo settings
        }
    })
);

// Running the pipeline
pipeline.run(options, inputPath, outputPath).then(() => {
    console.log('SVG processing complete');
});
```

### External Library: `svgo`

`ToolSvg` utilizes the `svgo` library for SVG optimization. The settings provided in the `settings` option are used to configure `svgo`. For more information on `svgo` settings, refer to the [svgo documentation](https://github.com/svg/svgo).
````

### Generating Documentation with Custom GPT
To generate documentation for a specific tool (e.g., `ToolDemo.js`), use the following prompt format:

```markdown
write a downloadable documentation in md format of this tool ToolDemo.js
```

Include a description of the tool and its options, preferably by providing a `.d.ts` file for detailed type definitions. 

#### Adding Highlights
For added clarity, you can include highlights such as `[caution]`, `[tips]`, or `[info]` to emphasize important parts of the documentation.

## Using Classic ChatGPT for Documentation

Classic ChatGPT can be used for a wide range of documentation tasks. Here’s how you can leverage it:

**Custom Instructions**: Copy the instructions above in ChatGPT custom instructions section.

# Create a prompt

1. **Start a New Chat**: Open a new chat session in ChatGPT.

2. **Write the Prompt**: Clearly articulate your documentation needs. For example, if you’re documenting a Tool, your prompt might look like this:

````
write downloadable documentation in md format of this tool ToolDemo.js
[description] is a specialized component of the ToolX library, focused on SVG file manipulation and optimization, use svgo external library https://github.com/svg/svgo.

[options] export type ToolOptions = {
    /**
     * - Options to set the multipass property [default = true].
     */
    multipass?: boolean;
    /**
     * - Options to configure extensions.
     */
    exts?: ['svg'];
    /**
     * - Options to configure sharp library features.
     */
    settings?: ToolSettings;
};
export type ToolSettings = {
    /**
     * - Control the precision of floating point numbers.
     */
    floatPrecision?: number;
    /**
     * - Control the precision of transformation expressions.
     */
    transformPrecision?: number;
};
````
3. **Refine and Expand**: Based on the initial output, you can ask ChatGPT to refine specific sections or add additional details.

4. **Incorporate Highlights**: You can use `[warning]`, `[tip]`, `[info]`,`[danger]`, `[details]` to make the documentation more user-friendly.

5. **Review and Edit**: Always review the generated documentation for accuracy and completeness. Make necessary edits to ensure it meets your standards.

By following these steps, you can effectively use ChatGPT to create comprehensive and standardized documentation, saving time and ensuring consistency across your documentation suite.
