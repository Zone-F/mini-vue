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

        expect(foo).toBe(11);
        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe("foo");
    });

    it("scheduler", () => {
        //1、通过effect的第二个参数,给定一个 scheduler(function)
        //2、effect 第一次执行的 还会执行 fn
        //3、当响应式对象 set update 是不执行fn而是执行scheduler
        //4、如果执行 runner 则会再次执行 fn

        let dummy;
        let run;
        const scheduler = jest.fn(() => {
            run = runner;
        });

        const obj = reactive({ foo: 1 });

        const runner = effect(
            () => {
                dummy = obj.foo;
            },
            { scheduler }
        );

        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);

        // 触发set
        obj.foo++;
        expect(scheduler).toHaveBeenCalledTimes(1);
        // runner fn 不会再次触发
        expect(dummy).toBe(1);
        
        // run 时会再次执行fn
        run()
        expect(dummy).toBe(2);
    });
});
