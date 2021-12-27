import * as ss from 'superstruct';
import { ObjectSchema, ObjectType } from 'superstruct/lib/utils';

const assignDescriptors = <R extends unknown>(schema: R, aetherType: string, schemaName?: string) => {
    return Object.assign(schema, {
        docs: (example, description?: string) => Object.assign(schema, { example, description }),
        default: (defaultVal, example?: any, description?: string) => Object.assign(schema, {
            default: defaultVal,
            ...(example ? { example } : null),
            ...(description ? { description } : null),
        }),
        aetherType,
        ...(schemaName ? { schemaName } : null),
    });
};

const makeOptionalable = <T, S, ST extends ss.Struct<T, S>>(schema: ST, aetherType: string, schemaName?: string) => {
    return Object.assign(schema, {
        nullable: () => {
            const newSchema = Object.assign(ss.nullable(schema), { nullable: true });
            return assignDescriptors(newSchema, aetherType, schemaName);
        },
        optional: (nullable?: boolean) => {
            const newSchema = Object.assign(ss.optional(schema), { optional: true });
            if (!nullable) return assignDescriptors(newSchema, aetherType, schemaName);
            return assignDescriptors(Object.assign(ss.nullable(newSchema), { nullable: true }), aetherType, schemaName);
        },
    });
};

const aetherWrapper = <A extends any[], T, S>(struct: (...args: A) => ss.Struct<T, S>, aetherType: string) => {
    return (...args: A) => {
        const schema = assignDescriptors(struct(...args), aetherType);
        return makeOptionalable<T, S, typeof schema>(schema, aetherType);
    };
};

export const aetherID = aetherWrapper(ss.string, 'AetherID');
export const aetherString = aetherWrapper(ss.string, 'AetherString');
export const aetherNumber = aetherWrapper(ss.number, 'AetherNumber');
export const aetherBoolean = aetherWrapper(ss.boolean, 'AetherBoolean');
export const aetherDate = aetherWrapper(ss.date, 'AetherDate');
export const aetherEnum = <T extends string = string>(values: readonly T[]) => {
    const schema = assignDescriptors(ss.enums<T>(values), 'AetherEnum');
    return makeOptionalable<T, (typeof schema)['schema'], typeof schema>(schema, 'AetherEnum');
};

export const aetherSchema = <S extends ObjectSchema>(schemaName: string, objSchema: S) => {
    const aetherSchema = assignDescriptors(ss.object(objSchema), 'aetherSchema', schemaName);
    return makeOptionalable<
        ObjectType<S>,
        (typeof aetherSchema)['schema'],
        typeof aetherSchema
    >(
        aetherSchema,
        'AetherSchema',
        schemaName,
    );
};
export const aetherObject = <S extends ObjectSchema>(objSchema: S) => aetherSchema('', objSchema);
export const aetherArray = <T extends ss.Struct<any>>(Element: T) => {
    const arraySchema = assignDescriptors(ss.array<T>(Element), 'AetherArray');
    return makeOptionalable<
        ss.Infer<T>[],
        (typeof arraySchema)['schema'],
        typeof arraySchema
    >(
        arraySchema,
        'AetherSchema',
    );
};
export const aetherCollection = <S extends ObjectSchema>(objSchema: S) => {
    const entrySchema = aetherObject(objSchema);
    return aetherArray(entrySchema);
};

export const ats = {
    id: aetherID,
    string: aetherString,
    number: aetherNumber,
    boolean: aetherBoolean,
    date: aetherDate,
    enum: aetherEnum,
    schema: aetherSchema,
    object: aetherObject,
    array: aetherArray,
    collection: aetherCollection,
    // -- SuperStruct Validators --
    is: ss.is,
    validate: ss.validate,
    assert: ss.assert,
};

export default ats;
