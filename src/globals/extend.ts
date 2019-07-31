export function extend(object: any = {}) {
    Object.assign(this.prototype, object)
}