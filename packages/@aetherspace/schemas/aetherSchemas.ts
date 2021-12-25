import * as ss from 'superstruct';

const aetherWrapper = <A extends any[], T, S>(struct: (...args: A) => ss.Struct<T, S>) => {
    const assignDescriptors = <R extends unknown>(schema: R) => Object.assign(schema, {
        docs: (example, description?: string) => Object.assign(schema, { example, description }),
        default: (defaultVal, example?: any, description?: string) => Object.assign(schema, {
            default: defaultVal,
            ...(example ? { example } : null),
            ...(description ? { description } : null),
        }),
    });
    return (...args: A) => {
        const schema = assignDescriptors(struct(...args));
        return Object.assign(schema, {
            nullable: () => {
                const newSchema = Object.assign(ss.nullable(schema), { nullable: true });
                return assignDescriptors(newSchema);
            },
            optional: (nullable?: boolean) => {
                const newSchema = Object.assign(ss.optional(schema), { optional: true });
                if (!nullable) return assignDescriptors(newSchema);
                return assignDescriptors(Object.assign(ss.nullable(newSchema), { nullable: true })); 
            },
        });
    };
};

export const aetherString = aetherWrapper(ss.string);
export const aetherNumber = aetherWrapper(ss.number);
export const aetherBoolean = aetherWrapper(ss.boolean);

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
