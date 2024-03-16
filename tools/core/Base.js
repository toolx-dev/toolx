const id = { current: 0 };
class Base {
	debug = false;
	/**
	 *
	 * @param {*} [options]
	 * @param {string | string[]} [pathIn]
	 * @param {string} [pathOut]
	 */
	constructor(options = {}, pathIn, pathOut) {
		this.set(options, pathIn, pathOut);
	}

	/**
	 * getID
	 * @returns {number}
	 */
	getID() {
		return id.current;
	}

	/**
	 * getUID
	 * @returns {number}
	 */
	getUID() {
		return id.current++;
	}

	/**
	 * getExt
	 * @param {string} file
	 * @returns {string}
	 */
	static getExt(file) {
		return file.split('.').pop();
	}

	/**
	 * checkFileExt
	 * @param {string} file
	 * @param {string[]} exts
	 * @returns {boolean}
	 */
	static checkFileExt(file, exts) {
		return exts ? exts.includes(file.split('.').pop()) : true;
	}

	/**
	 * includes
	 * @param {string[]} arr
	 * @param {string} value
	 * @returns {boolean}
	 */
	includes(arr, value) {
		return arr.some((substring) => value.includes(substring));
	}

	/**
	 * excludes
	 * @param {string[]} arr
	 * @param {string} value
	 * @returns {boolean}
	 */
	excludes(arr, value) {
		return !this.includes(arr, value);
	}

	/**
	 * exact
	 * @param {string} inputValue
	 * @param {string} fileValue
	 * @returns {boolean}
	 */
	exact(inputValue, fileValue) {
		return inputValue === fileValue;
	}

	/**
	 * set
	 * @param {any} [options]
	 * @param {string | string[]} [pathIn]
	 * @param {string} [pathOut]
	 * @returns {this}
	 */
	set(options, pathIn, pathOut) {
		if (pathIn) this._pathIn = pathIn;
		if (pathOut) this._pathOut = pathOut;
		this._options = options;

		return this;
	}

	/**
	 * log
	 * @param  {...any} args
	 * @returns {void}
	 */
	log(...args) {
		if (this.debug) {
			console.log(...args);
		}
	}
}

export default Base;
