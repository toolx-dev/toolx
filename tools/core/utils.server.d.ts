export function getArgsFromCLI(): {
    options: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
    pathIn: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
    pathOut: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
};
/**
 * checkPythonPackages
 * @param {string[]} packages
 * @returns {Promise<void>}
 */
export function checkPythonPackages(packages: string[]): Promise<void>;
/**
 * runPython
 * @param {string} script
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export function runPython(script: string, args: string[]): Promise<void>;
/**
 * runCLI
 * @param {string} command
 * @param {string} script
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export function runCLI(command: string, script: string, args: string[]): Promise<void>;
/**
 * runNode
 * @param {string} script
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export function runNode(script: string, args: string[]): Promise<void>;
/**
 * runFile
 * @param {string} file
 * @param {string[]} commands
 * @returns {Promise<void>}
 */
export function runFile(file: string, commands: string[]): Promise<void>;
