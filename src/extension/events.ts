export function on(name: string = '', closure: () => void = () => {}) {
    const events = name.split(' ')
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < events.length; j++) {
            this[i].interactive = true
            this[i].on(events[j], closure)
        }
    }
}

export function off(name: string = '') {
    const events = name.split(' ')
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < events.length; j++) {
            this[i].off(events[j])
        }
    }
}