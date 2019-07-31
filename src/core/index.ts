import { extend } from '../globals'
import { createQuery } from './createQuery'
import * as extension from '../extension'

// @ts-ignore
export const query = (stage: any) => window.$ = createQuery(stage, query)

query.extend = extend

query.extend(extension)

