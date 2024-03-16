import { describe, it, expect, beforeEach } from 'vitest';
import Tool from '../ToolChat';

describe('ToolChat', () => {
    let toolInstance;

    beforeEach(async () => {
        toolInstance = new Tool();
    });

    it('should create an instance of Tool', () => {
        expect(toolInstance).toBeInstanceOf(Tool);
    });
});
