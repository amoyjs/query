/**
 * extend
 * 
 * query extend method
 * 
 * @module query/extend
 * 
 * @param { Object | Array } target - extend target
 * 
 * @example
 * 
 * import query from '@amoy/query'
 * 
 * query.extend({
 *     hide() {
 *         for (let i = 0; i < this.length; i++) {
 *             // hide all the selected items
 *             this[i].visible = false
 *         }
 *     },
 * })
 * 
 * $('some query').hide()
 */
export function extend(this: any, target: any = []) {
    if (Array.isArray(target)) {
        target.map((item) => extend.bind(this)(item))
    } else if (typeof target === 'object') {
        Object.assign(this.prototype, target)
    } else {
        console.error(`query extension's type must be "object" or "object[]"`)
    }
}
