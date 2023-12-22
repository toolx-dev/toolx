import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: process.env.RUNNER_TEMP ? ['packages/*/test/**/*.test.js', '!packages/combine/test/**/*.test.js'] : ['packages/*/test/**/*.test.js']
    },
});
