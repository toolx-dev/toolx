# Installation

<a href="https://github.com/toolx-dev/toolx" target="_blank"><img src="https://img.shields.io/badge/source-a?logo=github" alt="GitHub"></a>

The ToolX library offers a range of tools that can be installed individually or as part of the core package. Installation can be performed using either npm or yarn, depending on your preference.

## Installing Individual Tools

To install a specific tool from the ToolX library, such as `imagemin`, use the following commands:

::: code-group

```sh [npm]
npm i -D @toolx/imagemin
```

```sh [yarn]
yarn add -D @toolx/imagemin
```
:::


## Installing the Pipeline from Core

If you require the `Pipeline` functionality, it is essential to install it from the core package of ToolX. Additionally, if you plan to create a new tool using the ToolX library, the core package is also necessary. For more detailed information about these functionalities, you can refer to the official documentation of [Tool](https://github.com/toolx-dev/toolx/blob/main/docs/TheTool.md) and [Pipeline](https://github.com/toolx-dev/toolx/blob/main/docs/PipelineInsight.md).

::: code-group

```sh [npm]
npm i -D @toolx/core
```

```sh [yarn]
yarn add -D @toolx/core
```
:::


## Global Installation for CLI Use

You can also install the tools globally to utilize them directly from the command line interface (CLI). This allows for the execution of ToolX tools as binary commands.

::: code-group

```sh [npm]
npm i -g @toolx/imagemin
```

```sh [yarn]
yarn add global @toolx/imagemin
```
:::

For example, to compress images in the directory where you run the command using the `imagemin` tool, simply type the following in the CLI:

```sh 
toolx-imagemin
```
