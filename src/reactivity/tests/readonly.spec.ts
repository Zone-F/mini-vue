import { isProxy, isReadonly, readyonly } from "../reactive";

describe("readonly",()=>{
    it("readonly",()=>{
        const original = { foo: 1 };
        const wrapped = readyonly(original)
    
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
        
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(original)).toBe(false)
      })   
      test("should nestend values readonly",()=>{
        const original = {
          foo:2,
          nested :{
            foo:1
          },
          bar:{baz:2}
        }
        const  warped = readyonly(original)

        expect(warped).not.toBe(original)
        expect(isReadonly(warped.bar)).toBe(true)
        expect(isReadonly(original)).toBe(false)
        expect(isProxy(warped)).toBe(true)
        expect(warped.foo).toBe(2)
      })
})