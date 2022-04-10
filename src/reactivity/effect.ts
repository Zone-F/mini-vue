import { extend } from "./shared";

let activeEffect;
let shouldTrack;

class ReactiveEffect {
    private _fn: any;
    public scheduler: Function | undefined;
    deps = [];
    active = true;
    // shouldTrack = true;
    onStop?:()=>void
    constructor(fn, scheduler) {
        this._fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        if(!this.active){
            return this._fn();
        }
        activeEffect = this;        
        //会收集依赖
        // shouldTrack 来做区分
        shouldTrack = true;
        const result = this._fn()
        shouldTrack = false
        return result
    }
    stop() {
        if (this.active) {
            cleanupEffect(this)
            this.onStop && this.onStop()
            this.active = false;
        }

    }
}

const targetMap = new Map();
// 收集依赖
export function track(target, key) {
    if(!activeEffect) return;
    if(!shouldTrack) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }

    // 如果dep已经存在
    if(dep.has(activeEffect))return;

    dep.add(activeEffect);
    activeEffect.deps.push(dep)
}

// 触发依赖
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);

    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}
function isTracking() {
    return shouldTrack && activeEffect !== undefined;
}
function cleanupEffect(efftct){
    efftct.deps.forEach((dep) => {
        dep.delete(efftct);
    });
    efftct.deps.length = 0
}

export function effect(fn, options = {}) {
    const _effect = new ReactiveEffect(fn, options?.scheduler);
    _effect.run();
    extend(_effect,options)

    const runner = _effect.run.bind(_effect);
    runner.effect = _effect
    return runner;
}

export function stop(runner) {
    runner.effect.stop();
}
