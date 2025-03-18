import { NextResponse } from 'next/server'
import { getUrlParams } from '../utils/apiUtils'

/** --- createNextRouteHandler() --------------------------------------------------------------- */
/** -i- Codegen: Build next.js app dir api route from a schema resolver  */
export const createNextRouteHandler = (handler: any$Todo) => {
    return async (req: Request, { params }: any$Todo) => {
        // Parse query params
        const query = getUrlParams(req.url)
        // Parse request params
        const reqParams = await params
        // Parse body?
        let args = { ...query, ...reqParams }
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const body = await req.json()
            args = { ...query, ...body, ...reqParams }
        }
        // Run handler & return response
        const responseData = await handler({ req, reqParams, args })
        return NextResponse.json(responseData)
    }
}
