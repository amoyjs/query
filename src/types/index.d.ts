import { createQuery } from '../core/createQuery'
export default function query(stage: PIXI.Container): typeof select
declare function select(selector: string | object): any
export interface IQuery extends Function {
    use: (fn: () => void) => void
    extend: (target: any) => void
}