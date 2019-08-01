import { extend } from '../globals'
import { createQuery } from './createQuery'

// @ts-ignore
export const query = (stage: any) => window.$ = createQuery(stage, query)

query.extend = extend
