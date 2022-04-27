import { isReactive } from '../reactive';
import {ref} from '../ref.ts';

describe('ref ',()=>{
    it("happy path",()=>{
        const foo = {bar:1}
        const fooRef = ref(foo)
        fooRef.bar++
        expect(fooRef.value.bar).toBe(2)
    })

    it("",()=>{

    })

    it("targrt是对象时,使用 reactive ",()=>{
        const foo = {bar:1}
        const fooRef = ref(foo)

        fooRef.value.bar = 2
        
        expect(fooRef.value.bar).toBe(2)
        expect(isReactive(fooRef.value)).toBe(true)
    })
})