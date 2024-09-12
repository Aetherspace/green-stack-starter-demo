import { NextResponse } from 'next/server'
import { getUrlParams } from '../utils/apiUtils'

/** --- createNextRouteHandler() --------------------------------------------------------------- */
/** -i- Codegen: Build next.js app dir api route from a schema resolver  */
export const createNextRouteHandler = (handler: any$Todo) => {
    return async (req: Request, { params }: any$Todo) => {
        // Parse query params
        const query = getUrlParams(req.url)
        // Parse body?
        let args = { ...query, ...params }
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const body = await req.json()
            args = { ...query, ...body, ...params }
        }
        // Run handler & return response
        const responseData = await handler({ req, params, args })
        return NextResponse.json(responseData)
    }
}
