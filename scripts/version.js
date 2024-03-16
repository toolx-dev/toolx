import fs from 'fs';
import path from 'path';
import { execCommand } from './utils.js'

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

            if (packageName === 'core') {
                let packageNames = await getAllPackageNames();
                packageNames = packageNames.filter(e => e !== 'core');
                for (const pkgName of packageNames) {
                    await bumpVersion(pkgName, 'patch');
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function bumpVersion(packageName, type, packageType = 'tools') {
    const packageCoreDir = path.join(process.cwd(), 'tools', 'core');
    const packageJsonCorePath = path.join(packageCoreDir, 'package.json');

    const packageDir = path.join(process.cwd(), packageType, packageName);
    const packageJsonPath = path.join(packageDir, 'package.json');

    const prevPackageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));
    const rootPackageJson = JSON.parse(await fs.promises.readFile(packageJsonCorePath, 'utf-8'));

    prevPackageJson.dependencies["@toolx/core"] = `^${rootPackageJson.version}`;

    if (packageName !== 'core')
        await fs.promises.writeFile(packageJsonPath, JSON.stringify(prevPackageJson, null, 4));

    await execCommand(`cd ${packageDir} && npm run test`);

    await execCommand(`cd ${packageDir} && npm version ${type}`);

    const updatedPackageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));
    const packageVersion = updatedPackageJson.version;

    console.log(`Version bumped for ${packageName} from v${prevPackageJson.version} to v${packageVersion}`);

    await execCommand(`git tag ${packageName}/${packageVersion}`);
    await execCommand(`git add .`);
    await execCommand(`git commit -m "bump version"`);
    await execCommand(`git push origin ${packageName}/${packageVersion}`);

    console.log(`Tag created and pushed for ${packageName} v${packageVersion}`);
}

async function getAllPackageNamesByPackageType(packageType) {
    const packagesDir = path.join(process.cwd(), packageType);
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

async function getAllPackageNames() {
    const tools = await getAllPackageNamesByPackageType('tools');
    const supertools = await getAllPackageNamesByPackageType('tools');

    return [...tools, ...supertools];
}

init();
