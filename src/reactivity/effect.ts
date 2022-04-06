import { extend } from "./shared";

class ReactiveEffect {
    private _fn: any;
    public scheduler: Function | undefined;
    deps = [];
    active = true;
    onStop?:()=>void
    constructor(fn, scheduler) {
        this._fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        activeEffect = this;
        return this._fn();
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

    if(!activeEffect) return;

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

function cleanupEffect(efftct){
    efftct.deps.forEach((dep) => {
        dep.delete(efftct);
    });
}


// export function track(target,key){};
let activeEffect;
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
