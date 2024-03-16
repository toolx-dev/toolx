export default Pipeline;
/**
 * Pipeline
 * @extends Base
 */
declare class Pipeline extends Base {
    /**
   * Enum of supported custom event names.
   * @enum {string}
   */
    static EVENTS: {
        COMPLETE: string;
        INIT: string;
    };
    data: any[];
    eventHandler: Event;
    /**
     * compose
     * @param  {...any} fns
     * @returns {Promise<void>}
     */
    compose(...fns: any[]): Promise<void>;
}
import Base from './Base.js';
import Event from './Event.js';
