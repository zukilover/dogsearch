import { mq } from "./mediaQuery"

describe("Media query helper", () => {
    it("appends media query rule", () => {
        expect(mq.up("xs")).toBe("@media (min-width: 480px)")
        expect(mq.up("sm")).toBe("@media (min-width: 576px)")
        expect(mq.down("xs")).toBe("@media (max-width: 480px)")
        expect(mq.down("sm")).toBe("@media (max-width: 576px)")
    })
})