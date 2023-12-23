import { spawn, exec } from 'node:child_process';
import mustargs from 'mustargs';
import glob from 'fast-glob'

const checkPythonPackages = (packages) => {
    return new Promise((resolve) => {
        const checkScript = packages.map(pkg => `import ${pkg}`).join('; ');
        const command = `python -c "${checkScript}"`;

        exec(command, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

const runCLI = (command, script, args) => {
    return new Promise((resolve, reject) => {
        // Spawn the Python process
        const process = spawn(command, [script, ...args]);

        // Collect data from stdout
        let stdoutData = '';
        process.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        // Collect data from stderr
        let stderrData = '';
        process.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        // Handle process completion
        process.on('close', (code) => {
            if (code === 0) {
                resolve(stdoutData);
            } else {
                reject(new Error(`Process exited with code ${code}: ${stderrData}`));
            }
        });

        // Handle process error (e.g., command not found)
        process.on('error', (error) => {
            reject(error);
        });
    });
}

const runPython = (script, args) => runCLI('python3', script, args);

const runNode = (script, args) => runCLI('node', script, args);

const getArgsFromCLI = () => {
    const args = mustargs(process.argv.slice(2));

    const pathIn = args.pathIn || args.i || process.cwd() + '/**/*';

    const pathOut = args.pathOut || args.o || process.cwd();
    const options = args.options || args.opts || args.s || {};

    return { ...args, options, pathIn, pathOut }
}

export {
    getArgsFromCLI,
    checkPythonPackages,
    runPython,
    runCLI,
    runNode,
};
