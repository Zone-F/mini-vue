import { effect } from '../effect';
import { isReactive } from '../reactive';
import {ref} from '../ref.ts';

describe('ref ',()=>{
    it("happy path",()=>{
        const a = ref(1)
        expect(a.value).toBe(1)
        // const foo = {bar:1}
        // const fooRef = ref(foo)
        // fooRef.bar++
        // expect(fooRef.value.bar).toBe(2)
    })

    it("是响应式对象",()=>{
        const a = ref(1)
        let dummy;
        let calls = 0;

        effect(()=>{
            calls++
            dummy = a.value
        })
        expect(calls).toBe(1)
        expect(dummy).toBe(1)
        a.value =2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
        // 相同的值不触发tigger
        a.value =2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    })

    it.skip("targrt是对象时,使用 reactive ",()=>{
        const foo = {bar:1}
        const fooRef = ref(foo)

        fooRef.value.bar = 2
        
        expect(fooRef.value.bar).toBe(2)
        expect(isReactive(fooRef.value)).toBe(true)
    })
})