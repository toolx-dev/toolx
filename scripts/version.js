import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

async function init() {
    try {
        const args = process.argv.slice(2);
        const packageName = args[0];
        const type = args[1] || 'patch';

        if (!packageName) {
            throw new Error('Please provide a package name.');
        }

        if (packageName === 'all' || type === "major") {
            const packageNames = await getAllPackageNames();
            for (const pkgName of packageNames) {
                await bumpVersion(pkgName, type);
            }
        } else {
            await bumpVersion(packageName, type);
        }
    } catch (error) {
        console.error(error);
    }
}

async function bumpVersion(packageName, type) {
    const packageDir = path.join(process.cwd(), 'packages', packageName);
    const packageJsonPath = path.join(packageDir, 'package.json');

    const prevPackageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));

    await execCommand(`cd ${packageDir} && npm version ${type}`);

    const updatedPackageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));
    const packageVersion = updatedPackageJson.version;

    console.log(`Version bumped for ${packageName} from v${prevPackageJson.version} to v${packageVersion}`);

    await execCommand(`git tag ${packageName}/${packageVersion}`);
    // await execCommand(`git push origin ${packageName}/${packageVersion}`);

    console.log(`Tag created and pushed for ${packageName} v${packageVersion}`);
}

async function execCommand(command) {
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

async function getAllPackageNames() {
    const packagesDir = path.join(process.cwd(), 'packages');
    const packageNames = [];

    const entries = await fs.promises.readdir(packagesDir);

    for (const entry of entries) {
        const packageDirPath = path.join(packagesDir, entry);
        const stats = await fs.promises.stat(packageDirPath);

        if (stats.isDirectory()) {
            packageNames.push(entry);
        }
    }

    return packageNames;
}

init();
