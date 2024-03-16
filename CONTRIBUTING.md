# Contributing to ToolX Library

Contributing to the ToolX library involves creating useful tools or wrappers around other libraries to facilitate their use with other tools. Here's a step-by-step guide to contribute effectively.

## Step 1: Create a Tool Placeholder

Use the script to create a placeholder for your tool:

```bash
npm run create <nameoftool>
```

This command does more than just create a file placeholder. It adds references to other files like `package.json` and `tsconfig.json`.

## Step 2: Write Your Tool

After running the script, a folder is created in the `tools` directory, e.g., `demo` for a tool named "Demo". Begin by editing `ToolDemo.js` inside `/tools/demo/ToolDemo.js`.

Key functions to use are `onEveryFile` and `onBody`. More information can be found in the documentation: [TheTool.md](https://github.com/toolx-dev/toolx/blob/main/docs/TheTool.md).

## Step 3: Document with JSDoc

Use JSDoc to write types. Focus on the `options` as they tend to be unique for each tool. This helps in automatically creating options for other platforms like apps and sites. Run:

```bash
npm run types
```

For more on why `.ts` files are not used, see: [WhyNoTypescript.md](https://github.com/toolx-dev/toolx/blob/main/docs/WhyNoTypescript.md).

## Step 4: Write Tests

Write tests for your tool as it will be tested on different platforms through GitHub actions. Run the tests with:

```bash
npm run test
```

## Step 5: Write a README

Create a `README.md` file for your tool. You can use ChatGPT to assist with this. Guidelines for writing it can be found here: [DocumentationByAI.md](https://github.com/toolx-dev/toolx/blob/main/docs/DocumentationByAI.md).

## Step 6: Commit, Push, and Publish

After testing and writing documentation, commit and push your tool. Use the `version` script to tag and bump the version, which is crucial for managing version and core dependencies:

```bash
npm run version
```

Once everything is pushed, you can test and publish it if you have the necessary permissions.

## Note on Changes and Versioning

If you need to make changes to your tool, other tools, or the core, follow the guideline on versioning.

## Versioning Guidelines
Contributing to the ToolX library involves understanding the versioning conventions used within the monorepo. These conventions are crucial for maintaining consistency, compatibility, and clarity across all packages.


### Patch Updates

- **When to use**:
  - Small changes.
  - Bug fixes.
  - Improvements in documentation, tests, etc.
- **Scope**: Applies to every package in the monorepo.
- **Command**: `npm run version <nameofpackage>`
- **Description**: Patch updates are used for minor tweaks that don't affect the API or overall functionality of a tool.

### Minor Updates

- **When to use**: 
  - API changes.
  - New features (also not backwards compatible).
  - Changes in the options structure that might break existing configurations (similar to a 'major' update in standard conventions).
  - Significant changes in tool functionality that alter output or usage.
- **Scope**: Applies to every package in the monorepo.
- **Command**: `npm run version <nameofpackage> minor`
- **Description**: Minor updates are significant yet don't affect the core functionality that might break other tools.

::: warning
Minor updates to the core are treated as per other packages - introducing new features without compromising other tools' functionality.
:::

### Major Updates

- **When to use**: 
  - Core changes that might break some or all tools.
- **Scope**: Only on the core package.
- **Command**: `npm run version <nameofpackage> major`
- **Description**: Major updates are used for substantial changes that have a widespread impact across the library.

## Versioning Commands

- **Individual Tool Update**: 
  - **Command**: `npm run version <nameofpackage>` for patch updates.
  - **Command**: `npm run version <nameofpackage> <type>` for specifying update type (`patch`, `minor`, `major`).
- **Bulk Update**: 
  - **Command**: `npm run version all` to upgrade all packages.
- **Note**: Using these commands automatically adds a tag about the package updates.
