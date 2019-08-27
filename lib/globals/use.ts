export const fns: any[] = []

export function use(fn: () => void) {
    fns.push(fn)
}
