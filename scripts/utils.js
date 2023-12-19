import { exec } from 'node:child_process';

export async function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Command failed: ${command}\nError: ${error.message}`));
            } else {
                resolve(stdout);
            }
        });
    });
}