import { render } from "@testing-library/react";
import App from "./App";

describe("Main application", () => {
    test('renders main application', () => {
        const wrapper = render(<App />)
        expect(wrapper).not.toBeNull()
    });
})
