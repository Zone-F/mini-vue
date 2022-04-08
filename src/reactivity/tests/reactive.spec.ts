import { reactive,readyonly } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { age: 1 };
    const observed = reactive(original);

    expect(original).not.toBe(observed);
    expect(observed.age).toBe(1);
  });

  it("readonly",()=>{
    const original = { foo: 1 };
    const wrapped = readyonly(original)

    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  })
  it("warn then call set",()=>{
    console.warn = jest.fn()

    const user = readyonly({
      age:10
    })
    
    user.age = 11
    expect(console.warn).toBeCalled()
  })
});
