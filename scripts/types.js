import ToolRemove from '@toolx/remove';

const run = async () => {
    const tool = new ToolRemove({}, [`${process.cwd()}/**/*.d.ts`, `!**/node_modules`])
    await tool.run();
}

run();
