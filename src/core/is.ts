export function sprite(target: any) {
    return typeof target._anchor !== 'undefined' && typeof target._font === 'undefined'
}

export function text(target: any) {
    return typeof target._font === 'string'
}

export function container(target: any) {
    return typeof target.anchor === 'undefined'
}