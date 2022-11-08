import { XSafeObjectWrapper } from '@episto/commonlogic';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ApplicationRoute } from '../models/types';

/**
 * @deprecated use "useRouteParams" 
 */
export const useIntParam = (name: string): number | null => {

    const param = useParams()[name];
    if (!param)
        return null;

    const parsed = parseInt(param);

    if (Number.isNaN(parsed))
        throw new Error(`Parsing int param "${name}" failed.`);

    return parsed;
};

export const useRouteParams = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return useRouteValues(route).params;
};

export const useRouteQuery = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return useRouteValues(route).query;
};

/**
 * @deprecated nono
 */
export const useRouteValues = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    const queryObj = useSearchParams()[0];
    const query = {} as any;
    const keysIterator = queryObj.keys();

    let result = keysIterator.next();
    while (!result.done) {

        const key = result.value;
        query[key] = queryObj.get(key);
        result = keysIterator.next();
    }

    const params = useParams();

    return {
        params: new XSafeObjectWrapper<TParams>(params as any),
        query: new XSafeObjectWrapper<TQuery>(query as any)
    };
};

export const useRouteParams2 = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    // unused, just for UI update triggers 
    const _ = useLocation();

    const template = route.route.getAbsolutePath();
    const url = window.location.pathname;
    const urlSplit = url.split('/');
    const templateSplit = template.split('/');

    const paramsObj = (() => {

        const params = {} as any;

        // lenght error 
        if (templateSplit.length > urlSplit.length)
            return {};

        const paramMatches = templateSplit
            .map((templatePart, index) => {

                const isParam = templatePart.startsWith(':');
                if (!isParam)
                    return templatePart === urlSplit[index]
                        ? 'notparam'
                        : 'mismatch';

                return { value: urlSplit[index], name: templatePart.replace(':', '') };
            });

        // mimatch error
        if (paramMatches.some(x => x === 'mismatch'))
            return {};

        // set param values 
        paramMatches
            .filter(x => x !== 'mismatch' && x !== 'notparam')
            .forEach((x: any) => {

                params[x.name] = x.value;
            });

        return params;
    })();

    return new XSafeObjectWrapper<TParams>(paramsObj);
};

export const useSetQueryParams = <TParmas = any>() => {

    const [, setSearchParams] = useSearchParams();
    const searchParams = useQueryParams().data;

    const setQueryParams = (key: keyof TParmas, value: string | null) => {

        // append param 
        if (value !== null) {

            setSearchParams({ ...searchParams, [key]: value });
        }

        // remove param 
        else {

            const newParmas: any = { ...searchParams };
            delete newParmas[key];
            console.log(newParmas);
            setSearchParams(newParmas);
        }
    };

    return { setQueryParams };
};

const useQueryParams = <TParams = any>() => {

    const [searchParams] = useSearchParams();

    const searchParamsObj = (() => {

        const query = {} as any;
        const keysIterator = searchParams.keys();

        let currentIter = keysIterator.next();
        while (!currentIter.done) {

            const key = currentIter.value;

            // HACKY! TODO
            if (key !== 'done' && key !== 'value'){

                query[key] = searchParams.get(key);
            }

            currentIter = keysIterator.next();
        }

        return query;
    })();

    return new XSafeObjectWrapper<TParams>(searchParamsObj as any);
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useStringParam = (name: string) => {

    const param = useParams()[name];
    if (!param)
        return null;

    return param;
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useQueryVal = (name: string) => {

    const [query] = useSearchParams();
    const val = query.get(name);

    return val;
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useBoolParam = (name: string) => {

    const params = useParams();
    const value = params[name];

    if (value !== 'true' && value !== 'false')
        throw new Error('Failed to parse boolean url param!');

    return value === 'true';
};

export const stringifyQueryObject = (queryObj: any) => {

    let qs = '?';

    for (const key in queryObj) {
        if (Object.prototype.hasOwnProperty.call(queryObj, key)) {

            const element = queryObj[key];
            const andMark = qs === '?'
                ? ''
                : '&';

            if (element !== undefined && element !== null)
                qs += andMark + key + '=' + element;
        }
    }

    return qs;
};

export const LocationHelpers = {
    useRouteParams2,
    useSetQueryParams,
    useQueryParams
};