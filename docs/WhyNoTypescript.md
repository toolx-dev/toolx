# ToolX Library and TypeScript

The ToolX library has made a deliberate choice not to use TypeScript files. While we appreciate TypeScript, we have found that using JSDocs for declaring types and generating `.d.ts` files suffices for our type coverage needs.

## Embracing JSDocs Over TypeScript

JSDocs provide a robust way to document and declare types within JavaScript files. This approach allows us to maintain type safety and generate type definition files without the overhead of managing TypeScript files.

### Benefits of Using JSDocs:

- **Simplified Workflow**: By avoiding the transpilation of `.ts` files, we reduce dependencies and the complexity of our library.
- **Increased Coding Speed**: Utilizing native JavaScript with type documentation enables quicker development cycles. Developers can edit and run files directly, maintaining efficiency without significant compromises.
- **Direct Execution**: JavaScript files can be executed as-is, without the need for a separate compilation step, enhancing the development experience.

## Why We Avoid TypeScript in ToolX

While TypeScript offers many benefits, its inclusion would introduce additional layers of complexity and dependency management that we aim to avoid. By sticking to JavaScript and JSDocs, we keep the library lightweight and straightforward, focusing on direct execution and ease of use.

### Exception: Small Libraries Around ToolX

Notably, we do use TypeScript in smaller, ancillary libraries like `mustargs`. These libraries benefit from TypeScript's features without burdening the main ToolX library with additional complexity.

## Conclusion

Our approach with ToolX prioritizes simplicity, speed, and direct execution, leveraging JSDocs for type management. This strategy aligns with our goal to create an efficient, easy-to-use, and agile development environment.
