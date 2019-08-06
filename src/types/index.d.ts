import { createQuery } from '../core/createQuery'

export interface IQuery {
    // @ts-ignore
    (stage: PIXI.Container): typeof select
    use: (fn: () => void) => void
    extend: (target: any) => void
}

declare function select(selector: string | object): any