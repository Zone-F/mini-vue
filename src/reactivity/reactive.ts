import { readyonlyHandlers, mutableHandlers } from "./baseHandlers";

export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}
export function readyonly(raw) {
    return createActiveObject(raw, readyonlyHandlers);
}
function createActiveObject(raw: any, handlers) {
    return new Proxy(raw, handlers);
}
