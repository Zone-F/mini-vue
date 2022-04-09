import { isReadonly, readyonly } from "../reactive";

describe("readonly",()=>{
    it("readonly",()=>{
        const original = { foo: 1 };
        const wrapped = readyonly(original)
    
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
        
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(original)).toBe(false)
      })   
})