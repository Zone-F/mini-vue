import { track, trigger } from "./effect";

export function reactive(raw) {
    return new Proxy(raw, {
        get: (target, key) => {
            //TODO 搜集依赖
            track(target,key)
            return Reflect.get(target, key);
        },
        set: (target, key, value) => {
            const res = Reflect.set(target, key, value);
            // 执行依赖
            trigger(target,key)
            return res;
        },
    });
}