
export type FunctionSignature<T> = (p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any) => T;

export type FunctionSignatureAnyArgs<T> = (...args: any[]) => T;

export type ConstructorSignatureAnyArgs<T> = new (...args: any[]) => T;
