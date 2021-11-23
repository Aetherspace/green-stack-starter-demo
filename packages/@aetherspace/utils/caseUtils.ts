export const snakeToCamel = (str: string) => str.replace(/(_\w)/g, m => m[1].toUpperCase());
export const snakeToDash = (str: string) => str.replace(/_/g, '-');
export const dashToCamel = (str: string) => str.replace(/(-\w)/g, m => m[1].toUpperCase());
export const dashToSnake = (str: string) => str.replace(/-/g, '_');
export const camelToSnake = (str: string) => str.replace(/[\w]([A-Z])/g, m => `${m[0]}_${m[1]}`).toLowerCase();
export const camelToDash = (str: string) => str.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();
