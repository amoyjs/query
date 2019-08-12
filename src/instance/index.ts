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
export function show() {
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
export function hide() {
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
export function get(index: number) {
    if (index) {
        return this[index]
    } else {
        const pure = []
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
export function width(width: number) {
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
export function height(height: number) {
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
export function position() {
    return {
        x: this[0] ? this[0].x : 0,
        y: this[0] ? this[0].y : 0,
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
export function children() {
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
export function count() {
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
export function first() {
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
export function last() {
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
export function each(closure: (item: any, index: number) => void) {
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
export function empty() {
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
export function parent() {
    return this[0] ? this[0].parent : null
}

export function text() {
    console.log('text() not support yet')
    return this[0] && this[0]._text && this[0]._text
}

export function css() {
    console.log('css() not support yet')
}

export function find() {
    console.log('find() not support yet')
}

export function offset() {
    console.log('offset() not support yet')
}

export function prev() {
    console.log('prev() not support yet')
}

export function next() {
    console.log('next() not support yet')
}

