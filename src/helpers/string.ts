export const rangeAverage = (str = ''): string => {
    // extract ranges from the string
    const ranges = (str.match(/\d+/g) || []).map(range => parseInt(range))
    // calculate and return the average of the ranges
    const sum = ranges.reduce((a: number, b: number): number => a + b, 0)
    // add weight to the criteria by appending the first item in the ranges array
    // so that it sorts correctly, e.g.: 11 years is greater than 10 - 12 years
    return `${sum / ranges.length}, ${ranges?.[0]}`
}