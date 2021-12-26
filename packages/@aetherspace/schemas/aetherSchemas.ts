import * as ss from 'superstruct';

const assignDescriptors = <R extends unknown>(schema: R, aetherType: string) => Object.assign(schema, {
    docs: (example, description?: string) => Object.assign(schema, { example, description }),
    default: (defaultVal, example?: any, description?: string) => Object.assign(schema, {
        default: defaultVal,
        ...(example ? { example } : null),
        ...(description ? { description } : null),
    }),
    aetherType,
});

const makeOptionalable = <T, S, ST extends ss.Struct<T, S>>(schema: ST, aetherType: string) => Object.assign(schema, {
    nullable: () => {
        const newSchema = Object.assign(ss.nullable(schema), { nullable: true });
        return assignDescriptors(newSchema, aetherType);
    },
    optional: (nullable?: boolean) => {
        const newSchema = Object.assign(ss.optional(schema), { optional: true });
        if (!nullable) return assignDescriptors(newSchema, aetherType);
        return assignDescriptors(Object.assign(ss.nullable(newSchema), { nullable: true }), aetherType); 
    },
});

const aetherWrapper = <A extends any[], T, S>(struct: (...args: A) => ss.Struct<T, S>, aetherType: string) => {
    return (...args: A) => {
        const schema = assignDescriptors(struct(...args), aetherType);
        return makeOptionalable<T, S, typeof schema>(schema, aetherType);
    };
};

export const aetherString = aetherWrapper(ss.string, 'AetherString');
export const aetherNumber = aetherWrapper(ss.number, 'AetherNumber');
export const aetherBoolean = aetherWrapper(ss.boolean, 'AetherBoolean');
export const aetherDate = aetherWrapper(ss.date, 'AetherDate');

export const aetherEnum = ss.enums; // aetherWrapper(s.enums);

export const aetherSchema = ss.object; // aetherWrapper(s.object);
export const aetherObject = ss.object;

export const aetherArray = ss.array; // aetherWrapper(s.array);

export const aetherCollection = (...args: Parameters<typeof aetherSchema>) => {
    const schema = aetherSchema(...args);
    return ss.array(schema);
};

export const ats = {
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
