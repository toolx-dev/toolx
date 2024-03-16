/**
 * capitalize
 * @param {string} s
 * @returns {string}
 */
export function capitalize(s: string): string;
/**
 * formatJson
 * @param {object} data
 * @param {number} indentLevel
 * @returns {string}
 */
export function formatJson(data: object, indentLevel?: number): string;
/**
 * toCamelCase
 * @param {string} string
 * @param {boolean} startWithCapital
 * @returns {string}
 */
export function toCamelCase(string: string, startWithCapital?: boolean): string;
export function deepMerge(...objects: any[]): {};
export const events: Event;
import Event from "./Event.js";
