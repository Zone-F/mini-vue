import { readyonlyHandlers, mutableHandlers, shallowReadonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly"
}

export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}

export function readyonly(raw) {
    return createActiveObject(raw, readyonlyHandlers);
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}

export function shallowReadonly(raw){
    return createActiveObject(raw, shallowReadonlyHandlers);
}

export function isProxy(value){
    return isReactive(value) || isReadonly(value);
}

function createActiveObject(raw: any, handlers) {
    return new Proxy(raw, handlers);
}
