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
    });
};
export declare const aetherEnum: typeof ss.enums;
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
        });
    };
    enum: typeof ss.enums;
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
