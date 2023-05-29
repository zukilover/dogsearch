export type SortArrayType = Record<string, string>[]
export type SortKeyType = string
export type SortOrderType = 'asc' | 'desc'

export const sortByKey = (arr: SortArrayType, key: SortKeyType) => (order: SortOrderType) => {
    const isDescending = order === 'desc'
    return [...arr].sort((a, b) => {
        // if a?.[key] is greater than b?.[key] by the ordering criterion
        // ascending: sort a?.[key] after b?.[key]
        // descending: sort a?.[key] before b?.[key]
        if (a?.[key] > b?.[key]) {
            return isDescending
                ? -1
                : 1
        }

        // if a?.[key] is less than b?.[key] by the ordering criterion
        // ascending: sort a?.[key] before b?.[key]
        // descending: sort a?.[key] after b?.[key]
        if (a?.[key] < b?.[key]) {
            return isDescending
                ? 1
                : -1
        }

        // otherwise keep the original order of a?.[key] and b?.[key]
        return 0
    })
}