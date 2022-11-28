
export type XDBMConstraintType = {
    fileName: string;
    tableName?: string;
}

export type XDMBIndexType = {
    name: string;
    tableName: string;
}

export type XDBMSchemaType = {
    views: Function[];
    entities: Function[];
}

export class XDBMSchemaService implements XDBMSchemaType {
    views: Function[];
    entities: Function[];

    constructor(opts: XDBMSchemaType) {

        this.views = opts.views;
        this.entities = opts.entities;
    }
}

export type ClassType<T> = { new(): T };

export type SQLSchemaObjectType = {
    name: string;
    columnNames: string[];
}

export interface ISQLConnectionService {
    executeSQLAsync<T = any>(script: string, values?: any[]): Promise<{ rows: T[] }>;
};