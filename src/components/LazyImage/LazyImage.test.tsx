import { act, render, screen } from "@testing-library/react";
import LazyImage from "./index";
import TestImage from "../../assets/test/test.jpg"

type ImageConstructor = new (
    width?: number | undefined,
    height?: number | undefined
) => HTMLImageElement;

let mockImageEventListener: jest.Mock<any, any> = jest.fn()

// mock Image class to trigger load event dynamically in tests
global.Image = class {
    addEventListener: Function;
    removeEventListener: Function;

    constructor() {
        this.addEventListener = (evt: string, fn: Function) => mockImageEventListener(evt, fn);
        this.removeEventListener = jest.fn();
    }
} as unknown as ImageConstructor;

describe('LazyImage component:', () => {
    let timer: any

    beforeEach(() => {
        timer = jest.useFakeTimers();
    });

    afterEach(() => {
        timer.clearAllTimers();
    });

    it('lazy loads image', async () => {
        // mock successful image load
        mockImageEventListener.mockImplementation((evt, fn) => {
            setTimeout(() => {
                if (evt === 'load') {
                    fn()
                }
            }, 1000)
        })

        // render the component
        render(<LazyImage src={TestImage} />)

        // image loading should appear
        const loader = await screen.findByTestId('lazy-image__loader')
        expect(loader).toBeInTheDocument()

        // on successful event, the real image's src should be loaded
        await act(async () => {
            await timer.advanceTimersByTime(1000);
        })
        const img = await screen.findByTestId('lazy-image__render')
        expect((img as HTMLImageElement)?.src).toMatch('test.jpg')
    });

    it('shows error image', async () => {
        // mock error image load
        mockImageEventListener.mockImplementation((evt, fn) => {
            setTimeout(() => {
                if (evt === 'error') {
                    fn()
                }
            }, 1000)
        })

        // render the component
        render(<LazyImage src={TestImage} />)

        // image loading should appear
        const loader = await screen.findByTestId('lazy-image__loader')
        expect(loader).toBeInTheDocument()

        // on error event, the error image's src should be loaded
        await act(async () => {
            await timer.advanceTimersByTime(1000);
        })
        const img = await screen.findByTestId('lazy-image__render')
        expect((img as HTMLImageElement)?.src).toMatch('error.png')
    });
})
