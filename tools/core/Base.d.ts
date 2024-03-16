export default Base;
declare class Base {
    /**
     * getExt
     * @param {string} file
     * @returns {string}
     */
    static getExt(file: string): string;
    /**
     * checkFileExt
     * @param {string} file
     * @param {string[]} exts
     * @returns {boolean}
     */
    static checkFileExt(file: string, exts: string[]): boolean;
    /**
     *
     * @param {*} [options]
     * @param {string | string[]} [pathIn]
     * @param {string} [pathOut]
     */
    constructor(options?: any, pathIn?: string | string[], pathOut?: string);
    debug: boolean;
    /**
     * getID
     * @returns {number}
     */
    getID(): number;
    /**
     * getUID
     * @returns {number}
     */
    getUID(): number;
    /**
     * includes
     * @param {string[]} arr
     * @param {string} value
     * @returns {boolean}
     */
    includes(arr: string[], value: string): boolean;
    /**
     * excludes
     * @param {string[]} arr
     * @param {string} value
     * @returns {boolean}
     */
    excludes(arr: string[], value: string): boolean;
    /**
     * exact
     * @param {string} inputValue
     * @param {string} fileValue
     * @returns {boolean}
     */
    exact(inputValue: string, fileValue: string): boolean;
    /**
     * set
     * @param {any} [options]
     * @param {string | string[]} [pathIn]
     * @param {string} [pathOut]
     * @returns {this}
     */
    set(options?: any, pathIn?: string | string[], pathOut?: string): this;
    _pathIn: string | string[];
    _pathOut: string;
    _options: any;
    /**
     * log
     * @param  {...any} args
     * @returns {void}
     */
    log(...args: any[]): void;
}
