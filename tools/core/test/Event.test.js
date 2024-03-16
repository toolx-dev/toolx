import { describe, it, expect, beforeEach } from 'vitest';
import Event from '../Event';

describe('Event class', () => {
    let eventInstance;
    let eventData;
    let eventName;
    let callbackCalled;

    beforeEach(() => {
        eventInstance = new Event();
        eventData = { message: 'Hello, World!' };
        eventName = 'customEvent';
        callbackCalled = false;
    });

    it('should create an instance of Event', () => {
        expect(eventInstance).toBeInstanceOf(Event);
    });

    it('should emit and listen to an event', () => {
        eventInstance.on(eventName, () => {
            callbackCalled = true;
        });
        eventInstance.emit(eventName, eventData);

        expect(callbackCalled).toBe(true); // Check if the callback was called
    });
});
