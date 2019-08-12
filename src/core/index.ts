import * as instance from '../instance'
import { use, extend } from '../globals'
import { createQuery } from './createQuery'
import queryEvent from '@amoy/query-event'
import { IQuery } from '../types'

/**
 * query
 * 
 * @module query/query
 * 
 * @param { Object } stage - PIXI stage
 * 
 * @example
 * 
 * import { Application as Game } from 'pixi.js'
 * 
 * const game = new Game({
 *     width: window.innerWidth,
 *     height: window.innerHeight,
 * })
 * 
 * query(game.stage)
 * //then you can use as
 * $('sprite').hide()
 * // or
 * $('text').on('tap', () => {})
 */
// @ts-ignore
export const query: IQuery = (stage: any) => window.$ = createQuery(stage, query)

query.use = use
query.extend = extend

query.extend([
    queryEvent,
    instance,
])