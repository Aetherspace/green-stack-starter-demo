import { use } from 'react'

export const extractParams = (params?: Record<string, unknown> | Promise<Record<string, unknown>>) => {
    // Unwrap the promise first?
    if (params instanceof Promise) return use(params as any as Promise<Record<string, unknown>>)
    // Otherwise, just return the params as an object
    return params
}
