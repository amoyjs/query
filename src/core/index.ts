import { extend } from '../globals'
import { createQuery } from './createQuery'
import queryEvent from '@amoy/query-event'

// @ts-ignore
export const query = (stage: any) => window.$ = createQuery(stage, query)

query.extend = extend

query.extend([
    queryEvent,
])