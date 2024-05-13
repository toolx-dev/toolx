import { spawn, exec, execFile } from 'node:child_process';

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
const runCLI = (command, script, args, options) => {
    return new Promise((resolve, reject) => {
        // Spawn the process
        const process = spawn(command, [script, ...(args || [])], options || {});

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
            process.stdin.pause();
            process.kill();
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

const getArgsFromCLI = async () => {
    const mustargs = import('mustargs');
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
const runFile = (file, commands, debug) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(file, commands);

        // Event listeners to handle process events
        childProcess.on('error', (error) => {
            if (debug) console.error(`Error executing ${file}:`, error);
            resolve(false);
            killProcess();
        });

        childProcess.on('close', (code, signal) => {
            if (debug) console.log(`Child process exited with code ${code} and signal ${signal}`);
            resolve(code === 0); // Resolve with true if exit code is 0 (success), otherwise false
            killProcess();
        });

        childProcess.on('exit', (code, signal) => {
            if (debug) console.log(`Child process exited with code ${code} and signal ${signal}`);
            resolve(code === 0); // Resolve with true if exit code is 0 (success), otherwise false
            killProcess();
        });

        // Function to kill the child process if needed
        const killProcess = () => {
            if (childProcess && !childProcess.killed) {
                childProcess.kill();
            }
        };

        // Return function to kill the process externally if needed
        resolve.killProcess = killProcess;
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
