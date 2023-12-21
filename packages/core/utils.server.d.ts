export function getArgsFromCLI(): {
    options: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
    pathIn: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
    pathOut: string | number | true | import("mustargs").MustargsNestedObject | import("mustargs").MustargsParsedValue[];
};
export function checkPythonPackages(packages: any): Promise<any>;
export function runPython(script: any, args: any): Promise<any>;
export function runCLI(command: any, script: any, args: any): Promise<any>;
export function runNode(script: any, args: any): Promise<any>;
