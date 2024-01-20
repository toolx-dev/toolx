import Event from "./Event.js";

/**
 * capitalize
 * @param {string} s
 * @returns {string}
 */
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);


/**
 * formatJson
 * @param {object} data
 * @param {number} indentLevel
 * @returns {string}
 */
const formatJson = (data, indentLevel = 2) => JSON.stringify(data, null, indentLevel);

/**
 * toCamelCase
 * @param {string} string
 * @param {boolean} startWithCapital
 * @returns {string}
 */
const toCamelCase = (string, startWithCapital = false) => {
    string = string.replace(/[^a-zA-Z0-9]/g, '');
    let words = string.split(/(?=[A-Z])/);
    const firstLetter = words[0].charAt(0);
    const nextLetters = words[0].slice(1);
    words[0] = startWithCapital ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
    words[0] += nextLetters;
    return words.join('');
};

function deepMerge(...objects) {
    let result = {};

    function isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    for (const source of objects) {
        if (isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!result[key]) result[key] = {};
                    result[key] = deepMerge(result[key], source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
    }

    return result;
}

const events = new Event()

export {
    capitalize,
    formatJson,
    toCamelCase,
    deepMerge,
    events
};
