import { EventEmitter } from 'events';

/**
 * Utility class for handling custom events in both Node.js and browser environments.
 */
class Event {
    /**
     * Create an instance of Event.
     */
    constructor(data) {
        this.data = data;
        this.eventEmitter = new EventEmitter();
    }

    /**
     * Emit a custom event with optional data.
     * @param {string} eventName - The name of the event to emit.
     * @param {*} _data - Data to be passed along with the event.
     */
    emit(eventName, _data) {
        const data = {
            ...this.data,
            ..._data,
        }
        this.eventEmitter.emit(eventName, data);
    }

    /**
     * Add a listener to a custom event.
     * @param {string} eventName - The name of the event to listen to.
     * @param {function} callback - The function to be called when the event is triggered.
     */
    on(eventName, callback) {
        this.eventEmitter.on(eventName, callback);
    }

    /**
     * Remove a listener from a custom event.
     * @param {string} eventName - The name of the event to remove the listener from.
     * @param {function} callback - The function to be removed as a listener.
     */
    off(eventName, callback) {
        this.eventEmitter.off(eventName, callback);
    }
}

export default Event;
