class ReactiveEffect {
    private _fn: any;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this
        this._fn();
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

    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set()
        depsMap.set(key,dep)
    }

    dep.add(activeEffect)
}

// 触发依赖
export function trigger(target,key){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    dep.map((effect)=>effect.run())
    // depsMap.map((fn)=>{
    //     fn().run
    // })
}


// export function track(target,key){};
let activeEffect;
export function effect(fn) {
    const _effect = new ReactiveEffect(fn);

    _effect.run();
}
