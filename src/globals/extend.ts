export function extend(target: any = []) {
    if (Array.isArray(target)) {
        target.map((item) => extend.bind(this)(item))
    } else if (typeof target === 'object') {
        Object.assign(this.prototype, target)
    } else {
        console.error(`query extension's type must be "object" or "object[]"`)
    }
}