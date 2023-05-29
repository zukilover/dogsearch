import { objToParams } from "./url"

describe('url helper:', () => {
    it('builds URL query params from object', () => {
        expect(objToParams({ foo: 'bar', baz: 'qux' })).toBe(`foo=bar&baz=qux`)
    })
})