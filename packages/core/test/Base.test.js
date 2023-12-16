import { describe, it, expect, beforeEach } from 'vitest';
import Base from '../Base.js';

describe('Base class', () => {
    let baseInstance;
    let options;
    let pathIn;
    let pathOut;

    beforeEach(() => {
        options = { testOption: true };
        pathIn = 'input/path';
        pathOut = 'output/path';
        baseInstance = new Base(options, pathIn, pathOut);
    });

    it('should create an instance of Base', () => {
        expect(baseInstance).toBeInstanceOf(Base);
    });

    it('should initialize with provided options and paths', () => {
        expect(baseInstance._options).toEqual(options);
        expect(baseInstance._pathIn).toBe(pathIn);
        expect(baseInstance._pathOut).toBe(pathOut);
    });

    it('getID should return the current id', () => {
        const baseInstance = new Base();
        expect(baseInstance.getID()).toBe(0);
    });

    it('getUID should return a unique identifier', () => {
        const baseInstance1 = new Base();
        const baseInstance2 = new Base();

        const id1 = baseInstance1.getUID();
        const id2 = baseInstance2.getUID();

        expect(id1).not.toBe(id2);
    });

    it('getExt should return the file extension', () => {
        expect(Base.getExt('example.jpg')).toBe('jpg');
        expect(Base.getExt('example.txt')).toBe('txt');
    });

    it('checkFileExt should validate file extensions', () => {
        expect(Base.checkFileExt('example.jpg', ['jpg', 'png'])).toBe(true);
        expect(Base.checkFileExt('example.pdf', ['jpg', 'png'])).toBe(false);
    });

    it('includes should check if array includes a value', () => {
        expect(baseInstance.includes(['hello', 'world'], 'world')).toBe(true);
        expect(baseInstance.includes(['hello', 'world'], 'test')).toBe(false);
    });

    it('excludes should check if array does not include a value', () => {
        expect(baseInstance.excludes(['hello', 'world'], 'test')).toBe(true);
        expect(baseInstance.excludes(['hello', 'world'], 'hello')).toBe(false);
    });

    it('exact should check for exact string match', () => {
        expect(baseInstance.exact('test', 'test')).toBe(true);
        expect(baseInstance.exact('Test', 'test')).toBe(false);
    });

    it('set method should update instance properties', () => {
        const newOptions = { newOption: 'newValue' };
        const newPathIn = 'new/input/path';
        const newPathOut = 'new/output/path';

        baseInstance.set(newOptions, newPathIn, newPathOut);

        expect(baseInstance._options).toEqual(newOptions);
        expect(baseInstance._pathIn).toBe(newPathIn);
        expect(baseInstance._pathOut).toBe(newPathOut);
    });

    it('log should output to console when debug is true', () => {
        const originalConsoleLog = console.log;
        let loggedOutput;
        console.log = (output) => {
            loggedOutput = output;
        };

        baseInstance.debug = true;
        baseInstance.log('Test log');

        expect(loggedOutput).toBe('Test log');

        console.log = originalConsoleLog;
    });
});
