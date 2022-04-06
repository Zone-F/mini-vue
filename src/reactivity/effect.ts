class ReactiveEffect {
    private _fn: any;
    public scheduler: Function | undefined;
    constructor(fn,scheduler) {
        this._fn = fn;
        this.scheduler = scheduler
    }
    run() {
        activeEffect = this;
        return this._fn();
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

    dep.add(activeEffect);
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

    // dep?.map((effect) => {
    //     if(effect.scheduler){
    //         effect.scheduler();
    //     }else{
    //         effect.run()

    //     }
    // });
}

// export function track(target,key){};
let activeEffect;
export function effect(fn, options = {}) {
    const _effect = new ReactiveEffect(fn,options?.scheduler);
    _effect.run();

    const runner = _effect.run.bind(_effect);
    return runner;
}
