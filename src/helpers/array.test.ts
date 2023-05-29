import { sortByKey } from "./array"

describe('array helper:', () => {
    it('sorts array of object by key', () => {
        const dogs = [
            { name: 'foo', age: '3' }, 
            { name: 'bar', age: '5' }, 
            { name: 'baz', age: '3' },
        ]
        const sorter = sortByKey(dogs, 'name')
        expect(sorter('asc')).toEqual([
            { name: 'bar', age: '5' }, 
            { name: 'baz', age: '3' },
            { name: 'foo', age: '3' }, 
        ])
        expect(sorter('desc')).toEqual([
            { name: 'foo', age: '3' }, 
            { name: 'baz', age: '3' },
            { name: 'bar', age: '5' }, 
        ])
    })
})