import * as instance from '../instance'
import { use, extend } from '../globals'
import { createQuery } from './createQuery'
import queryEvent from '@amoy/query-event'

export const query = (stage: any) => window.$ = createQuery(stage, query)
query.use = use
query.extend = extend

query.extend([
    queryEvent,
    instance,
])
