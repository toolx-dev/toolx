import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolImagemin';

describe('ToolImagemin', () => {
    let toolInstance;

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });
});
