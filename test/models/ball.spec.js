/* global describe, it, expect, beforeEach, spyOn */
import Ball from '../../src/models/ball';

describe('models/ball', () => {
    let testInstance = undefined;
    
    beforeEach(() => {
        testInstance = new Ball(30, 20, 10);
    });
    
    it('should work to use "instanceof" with the class', () => {
        expect(testInstance instanceof Ball).toBeTruthy();
    });
    
    it('should have a render function', () => {
        expect(typeof testInstance.render).toBe('function');
    });
    
    it('should have a "color" property', () => {
        expect(testInstance.hasOwnProperty('color')).toBeTruthy();
    });
    
    it('should have a "speed" property', () => {
        expect(testInstance.hasOwnProperty('speed')).toBeTruthy();
    });
    
    it('should have a "direction" property', () => {
        expect(testInstance.hasOwnProperty('direction')).toBeTruthy();
    });
    
    it('should have a "x" property', () => {
        expect(testInstance.hasOwnProperty('x')).toBeTruthy();
        expect(testInstance.x).toBe(30);
    });
    
    it('should have a "y" property', () => {
        expect(testInstance.hasOwnProperty('y')).toBeTruthy();
        expect(testInstance.y).toBe(20);
    });
    
    it('should have a "radius" property', () => {
        expect(testInstance.hasOwnProperty('radius')).toBeTruthy();
        expect(testInstance.radius).toBe(10);
    });
    
    it('should draw a correct circle', () => {
        const ctx = {
            fillStyle: undefined,
            beginPath: () => {
                // noting
            },
            arc: () => {
                // noting
            },
            fill: () => {
                // noting
            }
        };
        
        testInstance.color = '#ff00ff';
        spyOn(ctx, 'beginPath');
        spyOn(ctx, 'arc');
        spyOn(ctx, 'fill');
        
        testInstance.render(ctx);
        
        expect(ctx.fillStyle).toBe(testInstance.color);

        expect(ctx.beginPath).toHaveBeenCalled();
        expect(ctx.beginPath).toHaveBeenCalledWith();
        
        expect(ctx.arc).toHaveBeenCalled();
        expect(ctx.arc).toHaveBeenCalledWith(30, 20, 10, 0, Math.PI * 2);

        expect(ctx.fill).toHaveBeenCalled();
        expect(ctx.fill).toHaveBeenCalledWith();
    });
    
    it('should do nothing when called without a ctx', () => {
        const ctx = {
            fillStyle: undefined,
            beginPath: () => {
                // noting
            },
            arc: () => {
                // noting
            },
            fill: () => {
                // noting
            }
        };
        
        testInstance.color = '#ff00ff';
        spyOn(ctx, 'beginPath');
        spyOn(ctx, 'arc');
        spyOn(ctx, 'fill');
        
        testInstance.render();
        
        expect(ctx.fillStyle).not.toBe(testInstance.color);
        expect(ctx.beginPath).not.toHaveBeenCalled();
        expect(ctx.arc).not.toHaveBeenCalled();
        expect(ctx.fill).not.toHaveBeenCalled();
    });
});