import debounce from "./debounce"

describe('Debounce helper:', () => {
    let timer: any

    beforeEach(() => {
        timer = jest.useFakeTimers();
    });

    afterEach(() => {
        timer.clearAllTimers();
    });

    it('debounces function execution by {delay}ms', () => {
        const myFunction = jest.fn();
        const debounced = debounce(myFunction, 1000);

        // Immediate call should not execute the function
        debounced();
        expect(myFunction).toBeCalledTimes(0);

        // Call before the `delay` is reached should not execute the function
        for (let i = 0; i < 10; i++) {
            timer.advanceTimersByTime(500);
            debounced();
        }
        expect(myFunction).toBeCalledTimes(0);

        // Call should execute when it reaches the set `delay`
        timer.advanceTimersByTime(1000);
        expect(myFunction).toBeCalledTimes(1);
    });
})