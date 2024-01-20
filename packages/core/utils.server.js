import { spawn, exec, execFile } from 'node:child_process';
import mustargs from 'mustargs';

/**
 * checkPythonPackages
 * @param {string[]} packages 
 * @returns {Promise<void>}
 */
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

/**
 * runCLI
 * @param {string} command 
 * @param {string} script 
 * @param {string[]} args 
 * @returns {Promise<void>}
 */
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

/**
 * runPython
 * @param {string} script 
 * @param {string[]} args 
 * @returns {Promise<void>}
 */
const runPython = (script, args) => runCLI('python3', script, args);

/**
 * runNode
 * @param {string} script 
 * @param {string[]} args 
 * @returns {Promise<void>}
 */
const runNode = (script, args) => runCLI('node', script, args);

const getArgsFromCLI = () => {
    const args = mustargs(process.argv.slice(2));

    const pathIn = args.pathIn || args.i || process.cwd() + '/**/*';

    const pathOut = args.pathOut || args.o || process.cwd();
    const options = args.options || args.opts || args.s || {};

    return { ...args, options, pathIn, pathOut }
}

/**
 * runFile
 * @param {string} file 
 * @param {string[]} commands 
 * @returns {Promise<void>}
 */
const runFile = (file, commands) => {
    return new Promise((resolve) => {
        execFile(file, commands, (error, stdout, stderr) => {
            if (error) {
                console.log(error) // TODO: need to expose a debug constant to show errors 
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export {
    getArgsFromCLI,
    checkPythonPackages,
    runPython,
    runCLI,
    runNode,
    runFile,
};
