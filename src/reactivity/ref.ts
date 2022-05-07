import { isTracking, trackEffects, triggerEffects } from "./effect";

class RefImpl {
  private _value:any;
  public dep;
  constructor(value) {
    this._value = value;
    this.dep = new Set()
  }
  get value(){
    if(isTracking()){
      trackEffects(this.dep);
    }
    return this._value
  }
  set value(newValue){
    // 先修改value
    this._value = newValue

    triggerEffects(this.dep)
    // return newValue
  }
}

export function ref(value) {
  return new RefImpl(value);
}
