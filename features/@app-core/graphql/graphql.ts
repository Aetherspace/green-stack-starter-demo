import { initGraphQLTada } from 'gql.tada'
import { introspection } from '../graphql-env'

/** --- graphql() ------------------------------------------------------------------------------ */
/** -i- Custom graphql() function with our scalars embedded in them */
export const graphql = initGraphQLTada<{
    introspection: introspection
    scalars: {
        JSON: Record<string, unknown>
        JSONObject: ObjectType
        Date: Date
    }
}>()
