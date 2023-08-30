import { describe , it , afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';




describe("App Testing" , () => {

    afterEach(() => {
        cleanup();
    });


    it("shoud be true" , () => {
        expect(true).toBe(true);
    })



});