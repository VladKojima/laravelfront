export const pathSymbol = Symbol();

interface Routes {
    getAll?: string;
    getOne?: (id: number) => string;
    post?: string;
}

export function route(value: Routes) {
    return function (constructor: Function) {
        constructor.prototype[pathSymbol] = value;
    }
}