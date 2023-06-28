type MyReturnType<T extends (...args: any[]) => any> = T extends (
	...args: any[]
) => infer R
	? R
	: null;

export const enum COUNTERENUM {
	INCREMENT = "INCREMENT",
	DECREMENT = "DECREMENT",
}

// const INCREMENT = (payload: number) => ({
// 	type: COUNTERENUM.INCREMENT,
// 	payload,
// });

// type A = typeof INCREMENT;
/*
A的类型
type A = (payload: number) => {
    type: COUNTERENUM;
    payload: number;
}
*/

// const DECREMENT = (payload: string) => ({
// 	type: COUNTERENUM.DECREMENT,
// 	payload,
// });

// type B = typeof DECREMENT;
/**
 B的类型
 type B = (payload: string) => {
    type: COUNTERENUM;
    payload: string;
}
 */
// 怎么样才能使得 typeof 获得type的字面量类型?
// 使用 ts 3.7 以上的 常量断言 as const ,这样typeof 获得的即为字面量类型

const INCREMENT = (payload: number) =>
	({
		type: COUNTERENUM.INCREMENT,
		payload,
	} as const);

type A = typeof INCREMENT;
/*
A的类型
type A = (payload: number) => {
    type: COUNTERENUM;
    payload: number;
}
*/

const DECREMENT = (payload: string) =>
	({
		type: COUNTERENUM.DECREMENT,
		payload,
	} as const);

type B = typeof DECREMENT;

export type COUNTERACTIONTYPE = MyReturnType<A> | MyReturnType<B>;

/*
	type COUNTERACTIONTYPE = {
    type: COUNTERENUM;
    payload: number;
} | {
    type: COUNTERENUM;
    payload: string;
}
	*/
