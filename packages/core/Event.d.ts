export default Event;
/**
 * Utility class for handling custom events in both Node.js and browser environments.
 */
declare class Event {
    /**
     * Create an instance of Event.
     */
    constructor(data: any);
    data: any;
    eventEmitter: EventEmitter;
    /**
     * Emit a custom event with optional data.
     * @param {string} eventName - The name of the event to emit.
     * @param {*} _data - Data to be passed along with the event.
     */
    emit(eventName: string, _data: any): void;
    /**
     * Add a listener to a custom event.
     * @param {string} eventName - The name of the event to listen to.
     * @param {function} callback - The function to be called when the event is triggered.
     */
    on(eventName: string, callback: Function): void;
    /**
     * Remove a listener from a custom event.
     * @param {string} eventName - The name of the event to remove the listener from.
     * @param {function} callback - The function to be removed as a listener.
     */
    off(eventName: string, callback: Function): void;
}
import { EventEmitter } from 'events';
