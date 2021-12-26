import * as ss from 'superstruct';
import { ObjectSchema } from 'superstruct/lib/utils';
export declare const aetherString: () => ss.Struct<string, null> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<string, null> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string, null> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<string | null, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<string | null, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | null, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<string | undefined, null> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<string | undefined, null> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | undefined, null> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<string | null | undefined, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<string | null | undefined, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | null | undefined, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherNumber: () => ss.Struct<number, null> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<number, null> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number, null> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<number | null, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<number | null, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | null, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<number | undefined, null> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<number | undefined, null> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | undefined, null> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<number | null | undefined, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<number | null | undefined, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | null | undefined, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherBoolean: () => ss.Struct<boolean, null> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<boolean, null> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean, null> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<boolean | null, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<boolean | null, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | null, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<boolean | undefined, null> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<boolean | undefined, null> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | undefined, null> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<boolean | null | undefined, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<boolean | null | undefined, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | null | undefined, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherDate: () => ss.Struct<Date, null> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<Date, null> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date, null> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<Date | null, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<Date | null, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | null, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<Date | undefined, null> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<Date | undefined, null> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | undefined, null> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<Date | null | undefined, null> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<Date | null | undefined, null> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | null | undefined, null> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherEnum: <T extends string = string>(values: readonly T[]) => ss.Struct<T, { [K in T]: K; }> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<T, { [K in T]: K; }> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T, { [K in T]: K; }> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<T | null, { [K in T]: K; }> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<T | null, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | null, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<T | undefined, { [K in T]: K; }> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<T | undefined, { [K in T]: K; }> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | undefined, { [K in T]: K; }> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<T | null | undefined, { [K in T]: K; }> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<T | null | undefined, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | null | undefined, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherSchema: <S extends ObjectSchema>(objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherObject: <S extends ObjectSchema>(objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherArray: typeof ss.array;
export declare const aetherCollection: (objSchema: ObjectSchema) => ss.Struct<{
    [x: string]: any;
}[], ss.Struct<{
    [x: string]: any;
}, ObjectSchema> & {
    docs: (example: any, description?: string | undefined) => ss.Struct<{
        [x: string]: any;
    }, ObjectSchema> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
        [x: string]: any;
    }, ObjectSchema> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<{
        [x: string]: any;
    } | null, ObjectSchema> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | null, ObjectSchema> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | null, ObjectSchema> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<{
        [x: string]: any;
    } | undefined, ObjectSchema> & {
        optional: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | undefined, ObjectSchema> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | undefined, ObjectSchema> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<{
        [x: string]: any;
    } | null | undefined, ObjectSchema> & {
        nullable: boolean;
    } & {
        docs: (example: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | null | undefined, ObjectSchema> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        } | null | undefined, ObjectSchema> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
}>;
export declare const ats: {
    string: () => ss.Struct<string, null> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<string, null> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string, null> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<string | null, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<string | null, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | null, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<string | undefined, null> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<string | undefined, null> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | undefined, null> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<string | null | undefined, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<string | null | undefined, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<string | null | undefined, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    number: () => ss.Struct<number, null> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<number, null> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number, null> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<number | null, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<number | null, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | null, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<number | undefined, null> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<number | undefined, null> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | undefined, null> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<number | null | undefined, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<number | null | undefined, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<number | null | undefined, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    boolean: () => ss.Struct<boolean, null> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<boolean, null> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean, null> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<boolean | null, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<boolean | null, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | null, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<boolean | undefined, null> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<boolean | undefined, null> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | undefined, null> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<boolean | null | undefined, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<boolean | null | undefined, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<boolean | null | undefined, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    date: () => ss.Struct<Date, null> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<Date, null> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date, null> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<Date | null, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<Date | null, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | null, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<Date | undefined, null> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<Date | undefined, null> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | undefined, null> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<Date | null | undefined, null> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<Date | null | undefined, null> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<Date | null | undefined, null> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    enum: <T extends string = string>(values: readonly T[]) => ss.Struct<T, { [K in T]: K; }> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<T, { [K in T]: K; }> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T, { [K in T]: K; }> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<T | null, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<T | null, { [K in T]: K; }> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | null, { [K in T]: K; }> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<T | undefined, { [K in T]: K; }> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<T | undefined, { [K in T]: K; }> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | undefined, { [K in T]: K; }> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<T | null | undefined, { [K in T]: K; }> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<T | null | undefined, { [K in T]: K; }> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<T | null | undefined, { [K in T]: K; }> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    schema: <S extends ObjectSchema>(objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    object: <S extends ObjectSchema>(objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null, S> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | undefined, S> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>> | null | undefined, S> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    array: typeof ss.array;
    collection: (objSchema: ObjectSchema) => ss.Struct<{
        [x: string]: any;
    }[], ss.Struct<{
        [x: string]: any;
    }, ObjectSchema> & {
        docs: (example: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        }, ObjectSchema> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
            [x: string]: any;
        }, ObjectSchema> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<{
            [x: string]: any;
        } | null, ObjectSchema> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | null, ObjectSchema> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | null, ObjectSchema> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<{
            [x: string]: any;
        } | undefined, ObjectSchema> & {
            optional: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | undefined, ObjectSchema> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | undefined, ObjectSchema> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<{
            [x: string]: any;
        } | null | undefined, ObjectSchema> & {
            nullable: boolean;
        } & {
            docs: (example: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | null | undefined, ObjectSchema> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<{
                [x: string]: any;
            } | null | undefined, ObjectSchema> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    }>;
    is: typeof ss.is;
    validate: typeof ss.validate;
    assert: typeof ss.assert;
};
export default ats;
