import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: process.env.RUNNER_TEMP ? ['**/*.test.js', '!**/combine/test/**/*.test.js'] : ['**/*.test.js']
    },
});
