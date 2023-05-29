import { rangeAverage } from "./string"

describe('string helper', () => {
    it('formats average value from string', () => {
        expect(rangeAverage('11 years')).toBe('11, 11')
        expect(rangeAverage('11 - 15 years')).toBe('13, 11')
    })
})