import Base from './Base.js';
import Event from './Event.js';

/**
 * Pipeline
 * @extends Base
 */
class Pipeline extends Base {
    /**
   * Enum of supported custom event names.
   * @enum {string}
   */
    static EVENTS = {
        COMPLETE: 'complete',
        INIT: 'init',
    };

    data = [];

    eventHandler = new Event()

    /**
     * compose
     * @param  {...any} fns
     * @returns {Promise<void>}
     */
    compose(...fns) {
        this.eventHandler.emit(Pipeline.EVENTS.START, { ...fns })

        return (options, pathIn, pathOut) => fns.reduce(
            (
                prevFn,
                nextFn,
                index
            ) => prevFn.then((props) => {
                const _options = { ...options, ...this._options };
                const _props = [
                    { ...props, ..._options, index, count: fns.length },
                    props?.pathIn || this._pathIn || pathIn, // first the path from tool, then the path from pipeline, then the path from parent pipeline
                    this._pathOut || pathOut // first the path from pipeline, then the path from parent pipeline
                ];

                this.eventHandler.emit(Pipeline.EVENTS.COMPLETE, { ..._props, prevFn, nextFn })

                if (_options.ignore || props?.data?.options?.ignore) {
                    return Promise.resolve(..._props);
                }

                let output;

                if (nextFn) {
                    if ('run' in nextFn) {
                        output = nextFn.run(..._props);
                    } else if (typeof nextFn === 'function') {
                        output = nextFn(..._props);
                    }
                }

                this.data.push(output)

                return output;

            }),
            Promise.resolve()
        );
    }
}

export default Pipeline;
