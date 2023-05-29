export const breakpoints = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
}

type Breakpoints = keyof typeof breakpoints

export const mq = {
    up: function (bp: Breakpoints): string {
        return `@media (min-width: ${breakpoints[bp]})`
    },
    down: function (bp: Breakpoints): string {
        return `@media (max-width: ${breakpoints[bp]})`
    }
}