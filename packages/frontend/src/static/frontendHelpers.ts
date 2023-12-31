import { ErrorCodeType, ErrorWithCode, Id, RoleIdEnum } from '@episto/commontypes';
import quantize from 'quantize';
import React, { ComponentType, MutableRefObject, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applicationRoutes, rootRoute } from '../configuration/applicationRoutes';
import { ApplicationRoute } from '../models/types';
import { useNavigation } from '../services/core/navigatior';
import { useShowErrorDialog } from '../services/core/notifications';
import { CSSOptionsType, getCSSClassKeyFromOptions } from '../styles/globalCssTypes';
import { stringifyQueryObject } from './locationHelpers';
import { translatableTexts } from './translatableTexts';

export const iterate = <T>(n: number, fn: (index) => T) => {

    const results = [] as T[];

    for (let index = 0; index < n; index++) {

        results.push(fn(index));
    }

    return results;
};

type SetterFnType<TState> = (state: TState) => void;
type SetStateFnType<TState> = (setterFnOrState: SetterFnType<TState> | Partial<TState>) => void;

export const useTryCatchWrapper = (getMessageFromCode: (code: ErrorCodeType, defaultMessage: string) => string | undefined) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getWrappedAction = useCallback((action: () => Promise<void>) => {

        return async () => {

            try {

                await action();
                setErrorMessage(null);
            }
            catch (e: any) {

                const defaultMessage = 'Ismeretlen hiba tortent!';
                const errorWithCode = (e as ErrorWithCode);
                const customMessage = errorWithCode.code
                    ? getMessageFromCode(errorWithCode.code, defaultMessage) ?? null
                    : null;

                if (customMessage)
                    setErrorMessage(customMessage);
            }
        };
    }, [getMessageFromCode]);

    return {
        getWrappedAction,
        errorMessage
    };
};

export const useSafeWrapper = (
    action: () => Promise<void>,
    getMessageFromCode: (code: ErrorCodeType, defaultMessage: string) => string | undefined) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const wrappedAction = useCallback(async () => {

        try {

            await action();
            setErrorMessage(null);
        }
        catch (e: any) {

            const defaultMessage = 'Ismeretlen hiba tortent!';
            const errorWithCode = (e as ErrorWithCode);
            const customMessage = errorWithCode.code
                ? getMessageFromCode(errorWithCode.code, defaultMessage) ?? null
                : null;

            if (customMessage)
                setErrorMessage(customMessage);
        }
    }, [action, getMessageFromCode]);

    return {
        wrappedAction,
        errorMessage
    };
};

export const useStateObject = <TState extends {}>(obj: TState): [TState, SetStateFnType<TState>, TState] => {

    const forceUpdate = useForceUpdate();
    const state = useRef(obj).current;

    const setState = useCallback<SetStateFnType<TState>>((setterFnOrState) => {

        if (typeof setterFnOrState === 'function') {

            (setterFnOrState as any)(state);
        }
        else {

            Object.assign(state, setterFnOrState);
        }

        forceUpdate();
    }, [state, forceUpdate]);

    return [state, setState, state];
};

export const useStateAndRef = <T>(defaultValue: T): [MutableRefObject<T>, T, (state: T) => void] => {

    const [stateValue, stateSetter] = useState(defaultValue);
    const ref = useRef(stateValue);
    ref.current = stateValue;

    return [ref, stateValue, stateSetter];
};

export const useCSSOptionClasses = (cssOptions: CSSOptionsType) => {

    const cssOptionClasses = useMemo(() => {

        const classNameList = getCSSClassKeyFromOptions(cssOptions);

        return classNameList
            .join(' ');

    }, [cssOptions]);

    return {
        cssOptionClasses: cssOptionClasses
    };
};

export const useHandleAddRemoveItems = <TItem, TKey>(
    items: TItem[],
    setItems: (items: TItem[]) => void,
    opts?: {
        getKey?: (item: TItem) => TKey,
        sideEffects: ((newValue: TItem[]) => void)[]
    }): [
        (item: TItem | TItem[]) => void,
        (key: TKey) => void
    ] => {

    const getKeyInternal: (item: TItem) => TKey = useMemo(() => {

        if (opts?.getKey)
            return opts.getKey;

        return (x: TItem): TKey => x as any;
    }, [opts?.getKey]);

    const addItem = useCallback((item: TItem | TItem[]) => {

        const newItems = [...items, ...(Array.isArray(item) ? item : [item])];

        setItems(newItems);

        if (opts?.sideEffects)
            opts.sideEffects
                .forEach(x => x(items));
    }, [items, setItems, opts?.sideEffects]);

    const removeItem = useCallback((key: TKey): void => {

        const newItems = items
            .filter(item => getKeyInternal(item) !== key);

        setItems(newItems);

        if (opts?.sideEffects)
            opts.sideEffects
                .forEach(x => x(items));
    }, [items, setItems, getKeyInternal, opts?.sideEffects]);

    return [
        addItem,
        removeItem
    ];
};

export const formatTimespan = (seconds: number) => {

    const totalMinutes = seconds / 60;
    const totalHours = totalMinutes / 60;
    const roundHours = Math.floor(totalHours);
    const minutes = (totalHours - roundHours) * 60;
    const roundMinutes = Math.floor(minutes);
    const formattedSpentTime = `${roundHours > 0 ? roundHours + 'h ' : ''}${roundMinutes}m`;

    return formattedSpentTime;
};

export const formatSeconds = (seconds: number) => {

    const minutes = Math.floor(seconds / 60);
    const subseconds = seconds - (minutes * 60);

    return `${minutes === 0 ? '' : minutes + 'm '}${subseconds}s`;
};

export const areArraysEqual = <T>(arrA: T[], arrB: T[]) => {

    if (arrA.length !== arrB.length)
        return false;

    for (let index = 0; index < arrA.length; index++) {

        if (arrA[index] !== arrB[index])
            return false;
    }

    return true;
};

export const formatTime = (seconds: number) => {

    return new Date(seconds * 1000)
        .toLocaleTimeString('en-GB', {
            timeZone: 'Etc/UTC',
            hour12: false,
            minute: 'numeric',
            second: 'numeric'
        });
};

export const dateTimeToString = (date: Date | string) => {

    if (!date)
        return '';

    if (isString(date))
        return new Date(date)
            .toLocaleString();

    return date.toLocaleString();
};

export const toDateStringFormatted = (date: Date) => {

    if (!date)
        throw new Error('Date is null or undefined!');

    // getting the index of the month 0-11
    const monthIndex = date.getMonth();

    // getting day of the month 1-31
    const dayIndex = date.getDate();

    return `${getMonthName(monthIndex)}. ${dayIndex}`;
};

const formatDate = (value: string | Date) => {

    const date = typeof value === 'string'
        ? new Date(value)
        : value;

    return date
        .toLocaleString('hu-hu', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
};

export const Formatters = {
    dateTimeToString,
    toDateStringFormatted,
    formatDate
};

export const getUrl = (path: string, params?: any, query?: any) => {

    let replacedPath = path;

    if (params) {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {

                const element = params[key];
                const token = ':' + key;

                replacedPath = replacedPath.replace(token, element);
            }
        }
    }

    if (query) {

        replacedPath += stringifyQueryObject(query);
    }

    return replacedPath;
};

export const getRoleName = (roleId: Id<'Role'>) => {

    if (roleId === RoleIdEnum.administrator)
        return translatableTexts.roleNames.administrator;

    if (roleId === RoleIdEnum.supervisor)
        return translatableTexts.roleNames.supervisor;

    return translatableTexts.roleNames.user;
};

export const roundNumber = (num: number, decimalPlaces?: number) => {

    if (!decimalPlaces)
        decimalPlaces = 0.1;

    const multiplier = (decimalPlaces * 10);

    return Math.round(num * multiplier) / multiplier;
};

export const parseIntOrNull = (str: string) => {

    try {

        if (str === '' || str === null || str === undefined)
            str = '0';

        return parseInt(str);
    }
    catch (e) {

        return null;
    }
};

export const daysUntil = (firstDate: Date, secondDate: Date) => {

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs(((firstDate as any) - (secondDate as any)) / oneDay));

    return diffDays;
};


/**
 * Gets the month name by monthIndex
 * @param index Index of the month from 0-11
 */
export const getMonthName = (index: number) => {

    return [
        'Jan',
        'Febr',
        'Márc',
        'Ápr',
        'Máj',
        'Jún',
        'Júl',
        'Aug',
        'Szept',
        'Okt',
        'Nov',
        'Dec'
    ][index];
};

export const disallowWindowNavigation = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        // e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };
};

export const useCurrentUrlPathname = () => {

    const location = useLocation();
    return location.pathname;
};

type MemoFnType = <T extends ComponentType<any>>(
    c: T,
    areEqual?: (
        prev: React.ComponentProps<T>,
        next: React.ComponentProps<T>
    ) => boolean
) => T;

type MemoFnType2 = <TProps>(
    c: (props: TProps) => JSX.Element,
    areEqual?: (
        prev: TProps,
        next: TProps
    ) => boolean
) => (props: TProps) => JSX.Element;

export const typedMemo: MemoFnType2 = React.memo as any;

/**
 * Value ref compare test, using react's useEffect hook.
 * Logs the label on every ref change - and react refresh trigger of course.
 */
export const useValueCompareTest = (value: any, label: string) => {

    useEffect(() => {

        console.log(`*** ${label} CHANGED!`);
    }, [value]);
};

export const useIsMatchingCurrentRoute = () => {

    const currentUrl = useCurrentUrlPathname();

    return (appRoute: ApplicationRoute<any, any>) => {

        //console.log('isMatching called');

        if (!appRoute)
            throw new Error('Route is null or undefined!');

        if (!appRoute.route)
            throw new Error(`Application route (${JSON.stringify(appRoute.title)}) /route property is null or undefined!`);

        const compareRoute = appRoute.route.getAbsolutePath();

        const currentUrlSegments = currentUrl
            .split('/')
            .filter(x => x);

        /* console.log('currentUrlSegments: ');
        console.log(currentUrlSegments); */

        const compareRouteSegments = compareRoute
            .split('/')
            .filter(x => x);

        /* console.log('compareRouteSegments: ');
        console.log(compareRouteSegments); */

        if (compareRouteSegments.length === 0)
            return {
                isMatchingRoute: false,
                isMatchingRouteExactly: false,
                currentUrl: currentUrl
            };

        const segmentsCountMatch = currentUrlSegments.length === compareRouteSegments.length;

        const isSegmentsMismatch = compareRouteSegments
            .some((routeSegment, index) => {

                // url param
                if (routeSegment.startsWith(':') && isInteger(currentUrlSegments[index])) {

                    return false;
                }

                if (routeSegment === currentUrlSegments[index]) {
                    return false;
                }

                return true;
            });

        return {
            appRoute: appRoute,
            isMatchingRoute: !isSegmentsMismatch,
            isMatchingRouteExactly: !isSegmentsMismatch && segmentsCountMatch,
            currentUrl
        };
    };
};

export const getSubroutes = (route: ApplicationRoute<any, any>): ApplicationRoute<any, any>[] => {

    return Object
        .values(route)
        .filter(x => !!x.route);
};

export const coalesce = <T,>(obj: T | null | undefined, defaultObj: Partial<T>): T => {

    return ((obj === null || obj === undefined)
        ? defaultObj
        : obj) as any;
};

export const useGetCurrentAppRoute = () => {

    /*  console.log('---------------------');
     console.log('---------------------');
     console.log('useGetCurrentAppRoute');
     console.log('---------------------');
     console.log('---------------------'); */

    const isMatching = useIsMatchingCurrentRoute();
    const currentUrl = useCurrentUrlPathname();

    /* const filterObject = (obj: any, key: string) => {

        return Object.keys(obj)
            .filter(k => k === key)
            .reduce((acc, key) => {
                acc[key] = obj[key].getAbsolutePath();
                return acc[key];
            }, {});
    }; */

    function filterNestedObjectsByProperty(obj: any, key: string) {
        const results: any[] = [];

        if (obj[key]) {
            results.push(obj);
        }

        for (const prop in obj) {
            if (obj[prop] && typeof obj[prop] === 'object') {
                const nestedObj = obj[prop];
                const nestedResults = filterNestedObjectsByProperty(nestedObj, key);
                results.push(...nestedResults);
            }
        }

        return results;
    }

    //const routes = filterObject(new Object(applicationRoutes.settingsRoute), 'route');
    const routes: ApplicationRoute[] = filterNestedObjectsByProperty(new Object(rootRoute), 'route');

    const matchingRoutes = routes
        .map(x => {

            const match = isMatching(x);

            if (match.isMatchingRouteExactly)
                return x;
        })
        .filter(x => x);

    /* console.log(matchingRoutes.map(x => x?.route.getAbsolutePath())); */

    if (matchingRoutes.length !== 1)
        return applicationRoutes.matchAll;

    const matchingRoute = matchingRoutes
        .single(x => !!x);

    /* console.log(routes.map(x => x.route.getAbsolutePath()));
    console.log(matchingRoute?.route.getAbsolutePath()); */

    if (!matchingRoute)
        throw new Error(`No route matched "${currentUrl}"`);

    return matchingRoute;
};

export const useCurrentAppRouteCheck = (checkFn: (route: ApplicationRoute) => boolean) => {

    const currentRoute = useGetCurrentAppRoute();
    const result = useMemo(() => checkFn(currentRoute), [checkFn, currentRoute]);

    return useMemo(() => result, [result]);
};

/**
 * @deprecated BIG BIG NONON
 */
export const useRedirectOnExactMatch = (opts: {
    route: ApplicationRoute,
    redirectRoute: ApplicationRoute,
    params?: any
}) => {

    const { redirectRoute, route, params } = opts;

    const isMatching = useIsMatchingCurrentRoute();
    const { isMatchingRouteExactly } = isMatching(route);
    const { navigate2 } = useNavigation();

    useEffect(() => {

        if (!isMatchingRouteExactly)
            return;

        navigate2(redirectRoute, params);
    }, [isMatchingRouteExactly]);
};

export const isString = (obj: any) => typeof obj === 'string' || obj instanceof String;
export const isNumber = (obj: any) => typeof obj === 'number' || obj instanceof Number;

function isInteger(value) {
    return /^\d+$/.test(value);
}

export function distinct<T>(array: T[]) {

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const unique = array.filter(onlyUnique);

    return unique;
}

export function distinctByAllKeys<T extends Object, TKeyField extends keyof T>(array: T[], keys: TKeyField[]) {

    const isPropValuesEqual = (subject: T, target: T, propNames: TKeyField[]) => {

        return propNames.every(propName => subject[propName] === target[propName]);
    };

    const getUniqueItemsByProperties = (items: T[], keys: TKeyField[]) => {
        return items.filter((item, index, array) =>
            index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, keys))
        );
    };

    return getUniqueItemsByProperties(array, keys);
}

export const swapItems = (newList: any[], srcIndex: number, destIndex: number) => {

    newList.splice(destIndex, 0, newList.splice(srcIndex, 1)[0]);
    return newList;
};

export const insertAtIndex = <T>(arr: T[], index: number, item: T) => {

    arr.splice(index, 0, item);
    return arr;
};

export const isNullOrUndefined = (o: any) => {

    return o === undefined || o === null;
};

export const epochDates = (dateA: Date, dateB: Date) => {

    return Math.abs((dateA.getTime() - dateB.getTime()) / 1000);
};

export const usePaging = <T>({
    items,
    onNextOverNavigation,
    onPrevious,
    onPreviousOverNavigation,
    onItemSet,
    defaultValue
}: {
    items: T[] | number,
    defaultValue?: T | null,
    onPreviousOverNavigation?: () => void,
    onNextOverNavigation?: () => void,
    onPrevious?: () => void,
    onItemSet?: (opts: { item: T, index: number }) => void
}) => {

    if (!hasValue(items))
        throw new Error('Cannot page a null or undefined items collection!');

    const [currentIndex, setCurrentItemIndex] = useState(0);
    const [useDefaultValue, setUseDefaultValue] = useState(defaultValue !== undefined);

    const max = useMemo(() => isNumber(items)
        ? items as number
        : (items as any[]).length, [items]);

    const isLast = useMemo(() => currentIndex === max - 1, [max, currentIndex]);
    const isFirst = useMemo(() => currentIndex === 0, [currentIndex]);

    const currentItem = useMemo(() => {

        if (useDefaultValue)
            return defaultValue;

        return items[currentIndex] as T | null;
    }, [items, currentIndex, useDefaultValue, defaultValue]);

    const progressPercentage = useMemo(() => max > 0
        ? currentIndex / max * 100
        : 0, [max, currentIndex]);

    const next = useCallback(() => {

        if (isLast) {

            if (onNextOverNavigation)
                onNextOverNavigation();
        } else {

            setCurrentItemIndex(currentIndex + 1);
        }
    }, [onNextOverNavigation, setCurrentItemIndex, currentIndex, isLast]);

    const previous = useCallback(() => {

        if (isFirst) {

            if (onPreviousOverNavigation)
                onPreviousOverNavigation();
        } else {

            setCurrentItemIndex(currentIndex - 1);

            if (onPrevious)
                onPrevious();
        }
    }, [onPreviousOverNavigation, setCurrentItemIndex, isFirst, currentIndex, onPrevious]);

    const setItem = useCallback((itemIndex: number) => {

        if (itemIndex < 0)
            throw new Error('Item index is less than 0!');

        if (itemIndex > max - 1)
            throw new Error('Item index is more than the length of the items collection!');

        setCurrentItemIndex(itemIndex);
        setUseDefaultValue(false);

        if (onItemSet)
            onItemSet({ item: items[itemIndex], index: itemIndex });
    }, [setCurrentItemIndex, setUseDefaultValue, max, onItemSet, items]);

    const jumpToLast = useCallback(() => {

        setItem(max - 1);
    }, [setItem, max]);

    return useMemo(() => ({
        items,
        next,
        previous,
        isLast,
        isFirst,
        currentIndex,
        currentItem,
        progressPercentage,
        setItem,
        jumpToLast
    } as PagingType<T>), [
        items,
        next,
        previous,
        isLast,
        isFirst,
        currentIndex,
        currentItem,
        progressPercentage,
        setItem,
        jumpToLast
    ]);
};

export const moveItemInArray = <T,>(workArray: T[], oldIndex: number, newIndex: number): T[] => {

    const copiedArr = [...workArray];
    const length = copiedArr.length;

    if (oldIndex !== newIndex && length > oldIndex && length > newIndex) {
        copiedArr.splice(newIndex, 0, copiedArr.splice(oldIndex, 1)[0]);
    }

    return copiedArr;
};

export type PagingType<T> = {

    next: () => void;
    previous: () => void;
    setItem: (itemIndex: number) => void;
    jumpToLast: () => void;

    items: T[];
    currentItem: T | null;

    isLast: boolean;
    isFirst: boolean;
    currentIndex: number;
    progressPercentage: number;
};

export type PropsWithChildren = { children: ReactNode };

export const useEventTrigger = () => {

    const [state, setState] = useState(1);

    const fireEvent = useCallback(() => setState(state + 1), [setState, state]);

    return {
        subscriptionValue: state,
        fireEvent
    };
};

export type DictionaryOfT<T> = { [K: string]: T };

export type EventTriggerType = ReturnType<typeof useEventTrigger>;

export const useSubscribeEventTrigger = (trigger: EventTriggerType, callback: () => void) => {

    useEffect(() => {

        callback();
    }, [trigger.subscriptionValue]);
};

export const hasValue = (obj: any) => {

    if (obj === undefined)
        return false;

    if (obj === null)
        return false;

    if (obj === '')
        return false;

    return true;
};

export const usePostCallback = <T>(fn: (data?: T) => Promise<void>, afterEffects: (() => void | Promise<void>)[]) => {

    const showError = useShowErrorDialog();

    const execSafeAsync = useCallback(async (data?: T) => {

        try {

            await fn(data);

            for (let index = 0; index < afterEffects.length; index++) {

                const element = afterEffects[index];
                await element();
            }
        }
        catch (e) {

            showError(e);
        }
    }, [fn, ...afterEffects, showError]);

    return execSafeAsync;
};

export class ArrayBuilder<T = any> {

    private _array: T[];

    constructor() {

        this._array = [];
    }

    add(item: T) {

        this._array.push(item);
        return this;
    }

    addMany(items: T[]) {

        this._array = this._array.concat(items);
        return this;
    }

    addIf(cond: boolean, item: T) {

        if (cond)
            this.add(item);

        return this;
    }

    addIfMany(cond: boolean, items: T[]) {

        if (cond)
            this.addMany(items);

        return this;
    }

    getArray() {

        return this._array;
    }
}

export const reloadPage = () => window.location.reload();

export const isBetweenThreshold = (valueA: number, valueB: number, threshold: number) => {

    return (valueA - threshold) < valueB && valueB < (valueA + threshold);
};

export const getRandomInteger = (min: number, max: number) => {

    return Math.floor(Math.random() * (max - min)) + min;
};

export const secondsToTime = (e: any) => {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, '0'),
        m = Math.floor(e % 3600 / 60)
            .toString()
            .padStart(2, '0'),
        s = Math.floor(e % 60)
            .toString()
            .padStart(2, '0');

    return h !== '00' ? h + ':' + m + ':' + s : m + ':' + s;
};

export const isArray = (obj: any) => {

    return Array.isArray(obj);
};

// export const objToArray = (obj: any) => {

//     const properties = [] as any[];

//     for (const key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {

//             const element = obj[key];
//             properties.push(element);
//         }
//     }

//     return properties;
// };

export const isCurrentRoute = (route: string) => window.location.pathname === route;

export const isCurrentAppRoute = (route: ApplicationRoute) => {

    return false;
};

export const getEventValueCallback = (callback: (value: any) => void) => {

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {

        callback(e.currentTarget.value);
    };

    return inputChangeHandler;
};

export const getEventFileCallback = (callback: (value: any) => void) => {

    const inputChangeHandler = (e: React.ChangeEvent<{ files: unknown, name?: string }>) => {

        callback(e.currentTarget.files);
    };

    return inputChangeHandler;
};

export const getErrorTypeByHTTPCode = (code: number): ErrorCodeType => {

    if (code === 400)
        return 'bad request';

    if (code === 500)
        return 'internal server error';

    if (code === 403)
        return 'forbidden';

    return 'http error';
};

export const useForceUpdate = () => {

    // integer state
    const [value, setValue] = useState(0);

    // update the state to force render
    const forceUpdate = useCallback(() => {

        setValue(x => x + 1);
    }, []);

    (window as any)._rand_value_lol_hmm = value;

    return forceUpdate;
};

export const clone = <T>(item: T) => {

    return JSON.parse(JSON.stringify(item)) as T;
};

export const setPageTitle = (title: string) => {

    document.title = title;
};

export const useSetPageTitle = (title: string) => {

    useEffect(() => {

        setPageTitle(title);
    }, []);
};

/**
 * Gets the difference between two dates in days
 * @param date1 First date
 * @param date2 Second date
 */
export const dateDiffInDays = (date1: Date, date2: Date) => {

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const timeDiff = Math.floor(utc2 - utc1);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
};


export type ImageColorSettingsType = {
    colors?: number,
    cors?: boolean,
    windowSize?: number,
    format?: {
        rgb?: 'rgb',
        hex?: 'hex'
    }
}

export const useImageColor = (src: string, settings?: ImageColorSettingsType) => {

    const CHANNELS = 4;

    const [colors, setColors] = useState<number[][]>();

    const windowSize = settings?.windowSize || 50;
    const isCorsEnabled = settings?.cors || true;
    const colorsCount = settings?.colors || 2;
    const format = settings?.format || 'rgb';

    const getArrayOfPixels = useCallback((
        original: Uint8ClampedArray,
        chunkSize = 4
    ) => {

        const arrayOfPixels: Uint8ClampedArray[] = [];

        for (let i = 0; i < original.length; i += chunkSize * windowSize) {
            arrayOfPixels.push(original.slice(i, i + chunkSize));
        }

        return arrayOfPixels;
    }, [windowSize]);

    const mapToHex = useCallback(
        (values) => `#${values.map((i) => {
            const h = i.toString('16');
            return h.length < 2 ? `0${h}` : h;
        })
            .join('')}`,
        [],
    );

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');

        const context = canvas.getContext('2d');

        if (isCorsEnabled) {
            img.setAttribute('crossOrigin', '');
        }

        if (!context)
            return;

        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.drawImage(img, 0, 0);
            const { data } = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
            const colorMap = quantize(getArrayOfPixels(data, CHANNELS), colorsCount);

            const pallete = colorMap.palette();
            setColors(format === 'rgb'
                ? pallete
                : pallete.map(mapToHex));
        };

        img.src = src;
    }, [src, isCorsEnabled, colorsCount, format, getArrayOfPixels, mapToHex]);

    return { colors };
};