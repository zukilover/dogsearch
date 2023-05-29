// Brownie points #1: Write your own debounce function with unit tests
const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    const debouncedFn = (args?: unknown) => {
        // create an asynchronous function from the debounced fn
        return new Promise((resolve) => {
            if (timer) {
                // cancel execution once called
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                // resolve the function call
                resolve(fn(args));
            }, delay);
        })
    }
    return debouncedFn;
}

export default debounce