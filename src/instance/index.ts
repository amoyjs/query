export function show() {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = true
    }
    return this
}

export function hide() {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = false
    }
    return this
}

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

export function width(width: number) {
    if (typeof width === 'number') {
        for (let i = 0; i < this.length; i++) {
            this[i].width = width
        }
    } else {
        return this[0].width
    }
}

export function height(height: number) {
    if (typeof height === 'number') {
        for (let i = 0; i < this.length; i++) {
            this[i].height = height
        }
    } else {
        return this[0].height
    }
}

export function position() {
    return {
        x: this[0] ? this[0].x : 0,
        y: this[0] ? this[0].y : 0,
    }
}

export function children() {
    return this[0] ? this[0].children : []
}

export function count() {
    return this.length
}

export function first() {
    return this[0]
}

export function last() {
    return this[this.length - 1]
}

export function each(closure: (item: any, index: number) => void) {
    for (let i = 0; i < this.length; i++) {
        closure(this[i], i)
    }
}

export function empty() {
    for (let i = 0; i < this.length; i++) {
        this[i].removeChildren()
    }
}

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

