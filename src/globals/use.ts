export const fns = []

export function use(fn: () => void) {
    fns.push(fn)
}