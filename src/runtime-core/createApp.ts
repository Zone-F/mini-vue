import { render } from "./render"
import { createVNode } from "./vnode"

export function createApp(rootComonent){
    return {
        mount(rootContainer){
            //先vnode
            //componant -> vnode
            //所有的逻辑操作度基于vnode
            const vnode = createVNode(rootComonent)
            render(vnode,rootContainer)
        }
    }
}
