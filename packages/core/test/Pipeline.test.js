import { describe, it, expect, beforeEach } from 'vitest';
import Pipeline from '../Pipeline';

describe('Pipeline class', () => {
    let pipelineInstance;

    beforeEach(() => {
        pipelineInstance = new Pipeline();
    });

    it('should create an instance of Pipeline', () => {
        expect(pipelineInstance).toBeInstanceOf(Pipeline);
    });

    it('should have an empty data array', () => {
        expect(pipelineInstance.data).toEqual([]);
    });

    it('should add data to the data array when composing', async () => {
        const fns = [(props) => Promise.resolve(props)];

        await pipelineInstance.compose(...fns)({}, '', '');

        expect(pipelineInstance.data.length).toBe(1); // Check if data was added to the data array
    });

});
