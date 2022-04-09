import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

const get = createGetter();
const set = createSetter();
const readyonlyGetter = createGetter(true);

function createGetter(isReadonly = false) {
    return function get(target, key) {
        if(key === ReactiveFlags.IS_REACTIVE){
            return !isReadonly
        }else if(key === ReactiveFlags.IS_READONLY){
            return isReadonly
        }
        
        const res = Reflect.get(target, key);

        //TODO 搜集依赖
        !isReadonly && track(target, key);
        return res;
    };
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        // 执行依赖
        trigger(target, key);
        return res;
    };
}

export const mutableHandlers = {
    get,
    set,
};

export const readyonlyHandlers = {
    get: readyonlyGetter,
    set: (target, key, value) => {
        console.warn(
            `key:${key} set失败 target ${target} 是readyonly 只读对象`
        );

        return true;
    },
};
