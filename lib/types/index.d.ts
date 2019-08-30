interface Window {
    $: any
}

interface $$ {
    attr: (key: string, value?: any) => any
    animate: any
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
declare function $(selector: string | object): $$

declare module '@amoy/query' {
    interface query {
        (stage: PIXI.Container): $$
        extend: any
        use: any
    }
    const query: query
}