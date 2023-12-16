import { spawn, exec } from 'node:child_process';

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

export {
    checkPythonPackages,
    runPython,
    runCLI,
    runNode,
};
