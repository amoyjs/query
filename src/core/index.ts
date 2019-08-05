import { use, extend } from '../globals'
import { createQuery } from './createQuery'
import queryEvent from '@amoy/query-event'
import { IQuery } from '../types'

// @ts-ignore
export const query: IQuery = (stage: any) => window.$ = createQuery(stage, query)

query.use = use
query.extend = extend

query.extend([
    queryEvent,
])