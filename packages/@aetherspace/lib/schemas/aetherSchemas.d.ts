import * as ss from 'superstruct';
import { ObjectSchema } from 'superstruct/lib/utils';
export declare const aetherString: () => ss.Struct<string, null> & {
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
export declare const aetherSchema: <S extends ObjectSchema>(schemaName: string, objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
export declare const aetherArray: <T extends ss.Struct<any, unknown>>(Element: T) => ss.Struct<ss.Infer<T>[], T> & {
    schemaName?: string | undefined;
    docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[], T> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[], T> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<ss.Infer<T>[] | null, T> & {
        nullable: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | null, T> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | null, T> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<ss.Infer<T>[] | undefined, T> & {
        optional: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | undefined, T> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | undefined, T> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<ss.Infer<T>[] | null | undefined, T> & {
        nullable: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | null | undefined, T> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T>[] | null | undefined, T> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const aetherCollection: <S extends ObjectSchema>(objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
    schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
}> & {
    schemaName?: string | undefined;
    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    }> & {
        example: any;
        description: string | undefined;
    };
    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    }> & {
        description?: string | undefined;
        example?: any;
        default: any;
    };
    aetherType: string;
} & {
    nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    }> & {
        nullable: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    };
    optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    }> & {
        optional: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            optional: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            optional: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    }> & {
        nullable: boolean;
    } & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            nullable: boolean;
        } & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K in keyof S]: ss.Infer<S[K]>; }>>, S> & {
            schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
                schemaName?: string | undefined;
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
        }> & {
            nullable: boolean;
        } & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    });
};
export declare const ats: {
    string: () => ss.Struct<string, null> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    schema: <S extends ObjectSchema>(schemaName: string, objSchema: S) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_1 in keyof S]: ss.Infer<S[K_1]>; }>>, S> & {
        schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
            schemaName?: string | undefined;
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
    object: <S_1 extends ObjectSchema>(objSchema: S_1) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>>, S_1> & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>>, S_1> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>>, S_1> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null, S_1> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null, S_1> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null, S_1> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | undefined, S_1> & {
            optional: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | undefined, S_1> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | undefined, S_1> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null | undefined, S_1> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null | undefined, S_1> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_2 in keyof S_1]: ss.Infer<S_1[K_2]>; }>> | null | undefined, S_1> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    array: <T_1 extends ss.Struct<any, unknown>>(Element: T_1) => ss.Struct<ss.Infer<T_1>[], T_1> & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[], T_1> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[], T_1> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<ss.Infer<T_1>[] | null, T_1> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | null, T_1> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | null, T_1> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<ss.Infer<T_1>[] | undefined, T_1> & {
            optional: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | undefined, T_1> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | undefined, T_1> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<ss.Infer<T_1>[] | null | undefined, T_1> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | null | undefined, T_1> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<ss.Infer<T_1>[] | null | undefined, T_1> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    collection: <S_2 extends ObjectSchema>(objSchema: S_2) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
            optional: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    }> & {
        schemaName?: string | undefined;
        docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        } & {
            nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            };
            optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            });
        }> & {
            example: any;
            description: string | undefined;
        };
        default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[], ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        } & {
            nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            };
            optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            });
        }> & {
            description?: string | undefined;
            example?: any;
            default: any;
        };
        aetherType: string;
    } & {
        nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        } & {
            nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            };
            optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            });
        }> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        };
        optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        } & {
            nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            };
            optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            });
        }> & {
            optional: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                optional: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                optional: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        } & {
            nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            };
            optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                optional: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                nullable: boolean;
            } & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            });
        }> & {
            nullable: boolean;
        } & {
            schemaName?: string | undefined;
            docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                nullable: boolean;
            } & {
                example: any;
                description: string | undefined;
            };
            default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>[] | null | undefined, ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                schemaName?: string | undefined;
                docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    example: any;
                    description: string | undefined;
                };
                default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>>, S_2> & {
                    description?: string | undefined;
                    example?: any;
                    default: any;
                };
                aetherType: string;
            } & {
                nullable: () => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                };
                optional: (nullable?: boolean | undefined) => (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                    optional: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | undefined, S_2> & {
                        optional: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                }) | (ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                    nullable: boolean;
                } & {
                    schemaName?: string | undefined;
                    docs: (example: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        example: any;
                        description: string | undefined;
                    };
                    default: (defaultVal: any, example?: any, description?: string | undefined) => ss.Struct<import("superstruct/lib/utils").Simplify<import("superstruct/lib/utils").Optionalize<{ [K_3 in keyof S_2]: ss.Infer<S_2[K_3]>; }>> | null | undefined, S_2> & {
                        nullable: boolean;
                    } & {
                        description?: string | undefined;
                        example?: any;
                        default: any;
                    };
                    aetherType: string;
                });
            }> & {
                nullable: boolean;
            } & {
                description?: string | undefined;
                example?: any;
                default: any;
            };
            aetherType: string;
        });
    };
    is: typeof ss.is;
    validate: typeof ss.validate;
    assert: typeof ss.assert;
};
export default ats;
