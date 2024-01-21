---
outline: deep
---
# Quick CLI Usage

ToolX can be quickly used via the CLI with the `npx` command. Combine all files in the current directory:

```bash
npx @toolx/combine
```

Or, without `npx` after installing a tool globally, 

```bash
npm i @toolx/combine -g
```

you can directly use it in the CLI:

```bash
toolx-combine
```

In both methods, input files are taken from the current directory, and results are saved in the same directory. You can change the input folder, output folder, and options using the `--options`, `-i`, and `-o` parameters. 

Or you can also specify the input and output paths by providing them as the first two parameters:

```bash
npx @toolx/combine input/path/ output/path/
```

More details can be found [here](https://github.com/toolx-dev/toolx/blob/main/docs/CLI.md).

## CLI Wizard (Work in Progress)

ToolX also offers a CLI wizard for a guided usage of all library tools. This method can be accessed by using `@toolx/cli` and is currently under development, so future changes are expected.

## Using ToolX in Code

ToolX can be installed using npm for direct code usage. For example:

```javascript
import ToolSharp from "@toolx/sharp";

const tool = new ToolSharp(
    { api: { png: true }, ext: '.png'},
    `${process.cwd()}/in/**/*`,
    `${process.cwd()}/out/`
);
tool.run();
```

Details on creating a tool and further information are available [here](https://github.com/toolx-dev/toolx/blob/main/docs/TheTool.md). Remember to refer to the input path pattern using fast-glob syntax, detailed [here](https://github.com/toolx-dev/toolx/blob/main/docs/FastGlobPatternSyntax.md).

## Combining Tools with Pipeline

Tools can be combined using Pipeline, where the output of one tool becomes the input for the next. For instance, a tool to transform an image format, followed by composing the image into a spritesheet, and finally compressing it. More about Pipeline can be found [here](https://github.com/toolx-dev/toolx/blob/main/docs/PipelineInsight.md).