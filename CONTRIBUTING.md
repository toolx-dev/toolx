# Contributing to ToolX

Contributing to the ToolX library involves understanding the versioning conventions used within the monorepo. These conventions are crucial for maintaining consistency, compatibility, and clarity across all packages.

## Versioning Guidelines

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

:::caution
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
