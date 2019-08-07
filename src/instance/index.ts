export function show() {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = true
    }
}

export function hide() {
    for (let i = 0; i < this.length; i++) {
        this[i].visible = false
    }
}

export function get() {
    return this[0]
}

export function width(width: number) {
    for (let i = 0; i < this.length; i++) {
        this[i].width = width
    }
    return this[0].width
}

export function height(height: number) {
    for (let i = 0; i < this.length; i++) {
        this[i].height = height
    }
    return this[0].height
}

export function position() {
    return {
        x: this[0] ? this[0].x : 0,
        y: this[0] ? this[0].y : 0,
    }
}