/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: never;
  subscription: never;
  types: {
    'Boolean': unknown;
    'Float': unknown;
    'HealthCheckArgs': { kind: 'INPUT_OBJECT'; name: 'HealthCheckArgs'; isOneOf: false; inputFields: [{ name: 'echo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'HealthCheckData': { kind: 'OBJECT'; name: 'HealthCheckData'; fields: { 'alive': { name: 'alive'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'aliveSince': { name: 'aliveSince'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'aliveTime': { name: 'aliveTime'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'apiURL': { name: 'apiURL'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'backendURL': { name: 'backendURL'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'baseURL': { name: 'baseURL'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'debugPort': { name: 'debugPort'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'echo': { name: 'echo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'graphURL': { name: 'graphURL'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'kicking': { name: 'kicking'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'nodeVersion': { name: 'nodeVersion'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'now': { name: 'now'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'port': { name: 'port'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'requestHost': { name: 'requestHost'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'requestProtocol': { name: 'requestProtocol'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'requestURL': { name: 'requestURL'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'serverTimezone': { name: 'serverTimezone'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'status': { name: 'status'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'systemArch': { name: 'systemArch'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'systemFreeMemory': { name: 'systemFreeMemory'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'systemLoadAverage': { name: 'systemLoadAverage'; type: { kind: 'LIST'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'systemPlatform': { name: 'systemPlatform'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'systemRelease': { name: 'systemRelease'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'systemTotalMemory': { name: 'systemTotalMemory'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'v8Version': { name: 'v8Version'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Int': unknown;
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'healthCheck': { name: 'healthCheck'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'HealthCheckData'; ofType: null; }; } }; }; };
    'String': unknown;
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}