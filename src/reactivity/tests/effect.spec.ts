import { effect } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({ age: 10 });

    let newAge;
    effect(()=>{
        newAge = user.age + 1
    })

    expect(newAge).toBe(11)

    //update
    newAge++;
    expect(newAge).toBe(12)
  });
});
