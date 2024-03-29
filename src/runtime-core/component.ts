import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
// 创建组件实例
export function createComponentInstance(vnode) {
    const component = {
      vnode,
      type: vnode.type,
    };
  
    return component;
  }
  
  export function setupComponent(instance) {
    // TODO
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
  }
  
  function setupStatefulComponent(instance: any) {
    const Component = instance.type;
    
    //ctx
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

    const { setup } = Component;
  
    if (setup) {
      const setupResult = setup();
  
      handleSetupResult(instance, setupResult);
    }
  }
  
  function handleSetupResult(instance, setupResult: any) {
    // function Object
    // TODO function
    if (typeof setupResult === "object") {
      instance.setupState = setupResult;
    }
  
    finishComponentSetup(instance);
  }
  
  function finishComponentSetup(instance: any) {
    const Component = instance.type;

    instance.render = Component.render;
    // if (!Component.render) {
    //   instance.render = Component.render;
    // }
  }