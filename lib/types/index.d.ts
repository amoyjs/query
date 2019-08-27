declare function $(selector: string | object): {
    children: any
    count: any
    css: any
    each: any
    empty: any
    find: any
    first: any
    get: any
    height: any
    hide: any
    last: any
    next: any
    off: any
    offset: any
    on: any
    parent: any
    position: any
    prev: any
    show: any
    text: any
    width: any
}


interface Window {
    $: typeof $
}

declare module '@amoy/query' {
    function query(stage: PIXI.Container): typeof $
}