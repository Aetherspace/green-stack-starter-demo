import * as ss from 'superstruct';
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
export declare const aetherSchema: typeof ss.object;
export declare const aetherObject: typeof ss.object;
export declare const aetherArray: typeof ss.array;
export declare const aetherCollection: (schema: import("superstruct/lib/utils").ObjectSchema) => ss.Struct<{
    [x: string]: any;
}[], ss.Struct<{
    [x: string]: any;
}, import("superstruct/lib/utils").ObjectSchema>>;
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
    schema: typeof ss.object;
    object: typeof ss.object;
    array: typeof ss.array;
    collection: (schema: import("superstruct/lib/utils").ObjectSchema) => ss.Struct<{
        [x: string]: any;
    }[], ss.Struct<{
        [x: string]: any;
    }, import("superstruct/lib/utils").ObjectSchema>>;
    is: typeof ss.is;
    validate: typeof ss.validate;
    assert: typeof ss.assert;
};
export default ats;
