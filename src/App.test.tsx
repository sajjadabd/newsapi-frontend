import { describe , it , afterEach } from 'vitest';
import { render, screen , cleanup } from '@testing-library/react';
import App from './App';



describe("App Testing" , () => {

    afterEach(() => {
        cleanup();
    });


    it("shoud be true" , () => {
        expect(true).toBe(true);
    })



});