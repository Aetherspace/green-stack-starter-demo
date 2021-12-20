import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosRequestConfig } from 'axios';
export declare type ApiSourcesType = {
    query?: any;
    body?: any;
    cookies?: any;
    params?: any;
    args?: any;
    context?: any;
};
export declare type MiddlewareFnType = (req: NextApiRequest, res: NextApiResponse, next: (result: unknown) => void) => Promise<any>;
export declare const getApiParam: (key: string, apiSources: ApiSourcesType) => any;
export declare const getApiParams: (keys: string | string[], apiSources: ApiSourcesType) => {
    [key: string]: unknown;
};
export declare const runMiddleWare: (req: NextApiRequest, res: NextApiResponse, fn: MiddlewareFnType) => Promise<unknown>;
export declare const fireGetAndForget: (url: string, config?: AxiosRequestConfig<any> | undefined) => true | undefined;
export declare const firePostAndForget: (url: string, data: unknown, config?: AxiosRequestConfig<any> | undefined) => true | undefined;
