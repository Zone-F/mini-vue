import { reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { age: 1 };
    const observed = reactive(original);

    expect(original).not.toBe(observed);
    expect(observed.age).toBe(1);
  });
});
