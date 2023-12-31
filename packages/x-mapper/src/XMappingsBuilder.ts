import { MappingFunctionType, ContainerItemType } from "./XMapperTypes";

declare type ClassType<T> = {
    new(): T;
};

export class XMappingsBuilder<TServices extends any[]> {

    mappings: [{ new(): any }, MappingFunctionType<TServices, any>][] = [];

    addMapping<TObject, TMapFn extends MappingFunctionType<TServices, TObject>>(obj: ClassType<TObject>, fn: TMapFn) {

        // register function
        this.mappings
            .push([obj, fn]);

        // return null as any as Exclude<Parameters<TMapFn>, [UrlService]>;
        return null as any as ContainerItemType<TObject, TObject, TMapFn>;
    }

    addArrayMapping<TObject, TMapFn extends MappingFunctionType<TServices, TObject[]>>(obj: ClassType<TObject>, fn: TMapFn) {

        // register function
        this.mappings
            .push([obj, fn]);

        // return null as any as Exclude<Parameters<TMapFn>, [UrlService]>;
        return null as any as ContainerItemType<TObject, TObject[], TMapFn>;
    }
}