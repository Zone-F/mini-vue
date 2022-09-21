import { render } from "./render"
import { creareVNode } from "./vnode"

export function createApp(rootComonent){
    return {
        mount(rootContainer){
            //先vnode
            //componant -> vnode
            //所有的逻辑操作度基于vnode
            const vnode = creareVNode(rootComonent)
            render(vnode,rootContainer)
        }
    }
}
