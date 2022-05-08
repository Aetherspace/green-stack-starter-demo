import type { NextApiRequest, NextApiResponse, GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext } from 'next';
import type { AetherSchemaType, Infer } from '../../schemas';
import { MiddlewareFnType } from './apiUtils';
export declare type ResolverInputType<AT extends unknown = any> = {
    req?: NextApiRequest | GetServerSidePropsContext['req'];
    res?: NextApiResponse | GetServerSidePropsContext['res'];
    nextSsrContext?: GetServerSidePropsContext;
    nextStaticPathsContext?: GetStaticPathsContext;
    nextStaticPropsContext?: GetStaticPropsContext;
    parent?: any;
    args?: AT;
    params?: {
        [key: string]: AT[keyof AT] | unknown;
    };
    context?: any;
    info?: any;
    cookies?: NextApiRequest['cookies'];
    config?: {
        logErrors?: boolean;
        respondErrors?: boolean;
        allowFail?: boolean;
        logHandler?: (logs: string[]) => Promise<any>;
        onError?: (err: any) => unknown | void;
        [key: string]: any;
    };
    [key: string]: AT[keyof AT] | unknown;
};
export declare type ResolverExecutionParamsType<AT extends unknown = any> = {
    args: AT;
    logs: string[];
    addLog: (log: string) => void;
    saveLogs: (logHandler?: (logs: string[]) => Promise<any>) => Promise<void>;
    handleError: (err: any, sendResponse?: boolean) => unknown | void;
    config: {
        logErrors?: boolean;
        respondErrors?: boolean;
        logHandler?: (logs: string[]) => Promise<any>;
        onError?: (err: any) => unknown | void;
        allowFail?: boolean;
        [key: string]: any;
    };
    res?: NextApiResponse | GetServerSidePropsContext['res'];
};
export declare const aetherResolver: <TSAT extends unknown = null, TSRT extends unknown = null, AST extends AetherSchemaType = any, RST extends AetherSchemaType = any, AT extends unknown = TSAT extends null ? Infer<AST> : TSAT, RT extends unknown = TSRT extends null ? Infer<RST> : TSRT>(resolverFn: (ctx: ResolverExecutionParamsType<AT>) => Promise<unknown>, apiParamKeys?: string | undefined, apiArgSchema?: AST | undefined, apiResSchema?: RST | undefined) => ((ctx?: ResolverInputType<AT> | undefined) => Promise<RT>) & {
    argSchema: {};
    resSchema: {};
    ARGS_TYPE: AT;
    RESP_TYPE: RT;
};
export declare const makeNextApiHandler: <AT, RT>(resolver: (ctx?: ResolverInputType<AT> | undefined) => Promise<RT>, middleware?: MiddlewareFnType[], config?: ResolverInputType['config']) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export declare type AetherArgs<T extends (unknown & {
    ARGS_TYPE: unknown;
})> = T['ARGS_TYPE'];
export declare type AetherResp<T extends (unknown & {
    RESP_TYPE: unknown;
})> = T['RESP_TYPE'];
export default aetherResolver;
