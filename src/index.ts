import * as prototype from './prototype'

export default function query(stage: any) {
    const $ = createQuery(stage)
    // @ts-ignore
    window.$ = $
    return $
}

function createQuery(stage: any) {
    return (selector: any) => {
        const com = []
        const type = typeof selector

        switch (type) {
            case 'string':
                com.push(...stage.children)
                break
            case 'object':
                com.push(selector)
                break
            default:
                break
        }
        return Object.assign(com, query.prototype)
    }
}
Object.assign(query.prototype, prototype)

function parseQuery(query: any) {
    const type = typeof query
    if (type === 'string') {
        const querys = query.split(',').map((query: string) => {
            query = query.trim()
            if (query.startsWith('.')) {
                return {
                    query: query.slice(1),
                    type: 'class',
                }
            }
            if (query.startsWith('#')) {
                return {
                    query: query.slice(1),
                    type: 'id',
                }
            }
        })
        return querys.map()
    }
    return []
}
