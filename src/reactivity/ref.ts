class Refem {
  private _value = {};
  constructor(raw) {
    this._value = raw;
  }
}

export function ref(raw) {
  return new Proxy(raw, {
    get: function (target, key) {
        // if(key === ReactiveFlags.IS_REACTIVE){
        //     return !isReadonly
        // }else if(key === ReactiveFlags.IS_READONLY){
        //     return isReadonly
        // }
        
        // const res = Reflect.get(target, key);

        // if(shallowReadonly){
        //     return res;
        // }

        // // 如果res是一个obj  处理嵌套属性
        // if(isObject(res)){
        //     return isReadonly ? readyonly(res) : reactive(res)
        // }
        

        // //TODO 搜集依赖
        // !isReadonly && track(target, key);
        // return res;
    },
    set: function (target, key) {},
  });
}
