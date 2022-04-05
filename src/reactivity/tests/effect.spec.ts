import { effect } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
    it("happy path", () => {
        const user = reactive({ age: 10 });

        let newAge;
        effect(() => {
            newAge = user.age + 1;
        });

        expect(newAge).toBe(11);

        //update
        newAge++;
        expect(newAge).toBe(12);
    });

    //??runner是干嘛的??
    it("返回当前依赖", () => {
        let foo = 10;
        const runner = effect(() => {
            foo++;
            return "foo";
        });

        expect(foo).toBe(11)
        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe("foo");
    });
});
