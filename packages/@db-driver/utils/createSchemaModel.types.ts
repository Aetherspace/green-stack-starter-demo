
/* --- Constants ------------------------------------------------------------------------------- */

export const LOGICAL_OPERATORS = ['$and', '$or', '$nor', '$not']

export const QUERY_OPERATORS = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin']

/* --- Types ----------------------------------------------------------------------------------- */

export type QueryPrimitive = string | number | boolean | Date | null | undefined

export type QueryOperators<T> = {
    $eq?: T;
    $ne?: T;
    $gt?: T;
    $gte?: T;
    $lt?: T;
    $lte?: T;
    $in?: T[];
    $nin?: T[];
}

export type LogicalOperators<T> = {
    $and?: QueryFilterType<T>[];
    $or?: QueryFilterType<T>[];
    $nor?: QueryFilterType<T>[];
    $not?: QueryFilterType<T>;
}

export type QueryFilterType<T> = {
    [P in keyof T]?: T[P] extends QueryPrimitive 
        ? (QueryOperators<T[P]> | T[P])
        : QueryFilterType<T[P]>
} & LogicalOperators<T>
