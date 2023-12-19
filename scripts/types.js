import ToolRemove from '@toolx/tool-remove';

const run = async () => {
    const tool = new ToolRemove({}, [`${process.cwd()}/**/*.d.ts`, `!**/node_modules`])
    await tool.run();
}

run();
