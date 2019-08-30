/**
 * show
 * 
 * show the selected item
 *
 * @module query/show
 *
 * @example
 *
 * $('text').show()
 */
export function show(this: any) {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = true
    }
    return this
}

/**
 * hide
 *
 * hide the selected item
 *
 * @module query/hide
 *
 * @example
 *
 * $('text').hide()
 */
export function hide(this: any) {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = false
    }
    return this
}

/**
 * get
 * 
 * get item by index or get a collection for selected items
 * 
 * @module query/get
 * 
 * @param index
 *
 * @example
 *
 * $('text').get()
 * // or
 * $('text').get(0)
 */
export function get(this: any, index: number) {
    if (index) {
        return this[index]
    } else {
        const pure: any[] = []
        for (let i = 0; i < this.length; i++) {
            pure.push(this[i])
        }
        return pure
    }
}

/**
 * width
 * 
 * if param `width` is type of number,
 * `width()` will set selected items' width property
 * else return the first selected item's width value
 * 
 * @module query/width
 * 
 * @param { Number } width
 *
 * @example
 *
 * $('text').width()
 */
export function width(this: any, width: number) {
    if (typeof width === 'number') {
        for (let i = 0; i < this.length; i++) {
            this[i].width = width
        }
    } else {
        return this[0].width
    }
}

/**
 * height
 *
 * if param `height` is type of number,
 * `height()` will set selected items' height property
 * else return the first selected item's height value
 * 
 * @module query/height
 *
 * @param { Number } height
 *
 * @example
 *
 * $('text').height()
 */
export function height(this: any, height: number) {
    if (typeof height === 'number') {
        for (let i = 0; i < this.length; i++) {
            this[i].height = height
        }
    } else {
        return this[0].height
    }
}

/**
 * position
 * 
 * return the first selected item's coordanites
 * 
 * @module query/position
 *
 * @example
 *
 * $('text').position()
 */
export function position(this: any) {
    if (this[0]) {
        return {
            x: this[0].x,
            y: this[0].y,
        }
    } else {
        return null
    }
}

/**
 * children
 * 
 * return the first selected item's children
 * 
 * @module query/children
 *
 * @example
 *
 * $('text').children()
 */
export function children(this: any) {
    return this[0] ? this[0].children : []
}

/**
 * count
 * 
 * return the selected items' count
 * 
 * @module query/count
 *
 * @example
 *
 * $('text').count()
 */
export function count(this: any) {
    return this.length
}

/**
 * first
 *
 * return the first selected item
 * 
 * @module query/first
 *
 * @example
 *
 * $('text').first()
 *
 * @example
 *
 * $('text').first()
 */
export function first(this: any) {
    return this[0]
}

/**
 * last
 *
 * return the last selected item
 * 
 * @module query/last
 *
 * @example
 *
 * $('text').last()
 */
export function last(this: any) {
    return this[this.length - 1]
}

/**
 * each
 * 
 * @module query/each
 * 
 * @param { Function } closure - executeable functoin
 *
 * @example
 *
 * $('text').each(item => {
 *     $(item).hide()
 * })
 */
export function each(this: any, closure: (item: any, index: number) => void) {
    for (let i = 0; i < this.length; i++) {
        closure(this[i], i)
    }
}

/**
 * empty
 * 
 * remove the selected items' children
 * 
 * @module query/empty
 *
 * @example
 *
 * $('text').empty()
 */
export function empty(this: any) {
    for (let i = 0; i < this.length; i++) {
        this[i].removeChildren()
    }
}

/**
 * parent
 * 
 * if the first selected item's parent exist, return it, else return `null`
 * 
 * @module query/parent
 * 
 * @example
 * 
 * $('text').parent()
 */
export function parent(this: any) {
    return this[0] ? this[0].parent : null
}

export function attr(this: any, key: string, value?: any) {
    if (this[0] ) {  
        if (value) {
            this[0][key] = value
            return this[0]
        } else {
            return this[0][key]
        }
    }
}

export function text(this: any) {
    if (this[0]) {
        if (this[0].text) {
            return this[0].text
        } else if (this[0].children && this[0].children[0].text) {
            return this[0].children[0].text
        }
    } else {
        return null
    }
}

export function find() {
    console.log('find() not support yet')
}

export function prev(this: any) {
    if (this[0] && this[0].parent && this[0].parent.children.length) {
        return this[0].parent.children.filter((v, i) => {
            if (v === this[0]) {
                return this[0].parent.children[i - 1]
            }
        })[0]
    }
}

export function next(this: any) {
    if (this[0] && this[0].parent && this[0].parent.children.length) {
        return this[0].parent.children.filter((v, i) => {
            if (v === this[0]) {
                return this[0].parent.children[i + 1]
            }
        })[0]
    }
}
