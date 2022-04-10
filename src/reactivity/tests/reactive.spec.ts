import { isReactive, reactive,readyonly } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { age: 1 };
    const observed = reactive(original);

    expect(original).not.toBe(observed);
    expect(observed.age).toBe(1);
    
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
  });

  it("warn then call set",()=>{
    console.warn = jest.fn()

    const user = readyonly({
      age:10
    })
    
    user.age = 11
    expect(console.warn).toBeCalled()
  })

  test("nesten reactive",()=>{
    const original = {
      nested :{
        foo:1
      },
      array:[{bar:2}]
    }
    const  observed = reactive(original)

    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
});
