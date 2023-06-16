function format1(value: any) {
	value.toString(); // 不飘红，想干什么干什么，very dangerous
}

function format2(value: unknown) {
	// value.toString(); // 代码会飘红, value类型为未知

	// 你需要收窄类型范围，例如：

	// 1、类型断言 as Foo —— 不飘红，但执行时可能错误
	(value as number).toString();

	// 2. 类型保护 typeof,instanceof, 不飘红,且保证正常执行
	if (typeof value === "number") {
		value.toString();
	}

	// 3. asserts func https://www.typescriptlang.org/docs/handbook/2/narrowing.html#assertion-functions
	try {
		assertIsNumber(value);
		value.toString();
	} catch (error) {
		console.log(error);
	}
}

/** 类型断言函数，抛出错误 */
function assertIsNumber(arg: unknown): asserts arg is number {
	if (!(arg instanceof Number)) {
		// arg 是否为(class)Number的实例
		throw new TypeError("Not a Number: " + arg);
	}
}

/** never 的类型运算 */
// never 是 bottom type 和 null,undefined,any 不是一个性质的类型
type TypeA = number | never; // 始终为number
type TypeB = string & never; // 始终为 never

//never 是类型运算的最小因子

async function fetchNameWithTimeout(userId: string): Promise<string> {
	const data = await Promise.race([
		fetchData(userId) as { userName: string },
		timeout(1000),
	]);
	return data.userName;
}

// 下面是一个 timeout 函数的实现，如果超过指定时间，将会抛出一个 Error。
// 由于它是无返回的，所以返回结果定义为了 Promise<never>：
const timeout = (ms: number): Promise<never> => {
	return new Promise((_, reject) => {
		setTimeout(() => reject(new Error("timeout!")), ms);
	});
};

// 很好，接下来编译器会去推断 Promise.race 的返回值，
// 因为 race 会取最先完成的那个 Promise 的结果，所以在上面这个例子里，它的函数签名类似这样：

//function race<A, B>(inputs: [Promise<A>, Promise<B>]): Promise<A | B>;

const arr: object = [1, 2, 3, 4];
const arr2: unknown = [1, 2, 3, 45];
const arr3: any = arr2;
const arr4: unknown = arr2;
//const arr5: Array<string> = [1, 2, 3] as unknown;

type TTuple = [string, number];
type TArray = Array<string | number>;

type Result = TArray extends (number | string)[] ? true : false;
type Result1 = TArray extends TTuple ? true : false;
type Result2 = TTuple extends TArray ? true : false;

// 推断数组类型

type ElementOf<T> = T extends Array<infer E> ? E : never;

type ToUnion = ElementOf<TTuple>;

// infer 用来表示待推断的类型

// 1. 推断返回值
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : never;

type func = () => number; // 返回值为number
type str1 = string; // 返回值为nll
type funcReturnType = ReturnType2<func>; // type funcReturnType = number
type varReturnType = ReturnType2<str1>; // type varReturnType = never

// 2. infer 解包
type Ids = Array<number>;
type Names = string[];

type Unpacked<T> = T extends Array<infer R> ? R : T;

type idType = Unpacked<Ids>; // type idType = number 推断类型为 number
type nameType = Unpacked<Names>; // type nameType = string

type Response2 = Promise<number[]>;
type Unpacked2<T> = T extends Promise<infer R> ? R[] : never; // 返回值可以根据自己的需要来定义

type Response2Type = Unpacked2<Response2>;

// 3. infer 来 推断联合类型
type Foo<T> = T extends { a: infer R; b: infer R } ? R : never;
type T1 = Foo<{ a: number; b: number }>; // type T1 = number
type T2 = Foo<{ a: number; b: string[] | number }>; // type T2 = number | string[]

// keyof 获取一个对象的所有类型,并将其返回为联合类型
interface K1 {
	name: string;
	weight: number;
	age: number;
	gender: "man";
}

type UnionK1 = keyof K1; // "name" | "weight" | "age" | "gender"
type IsK1 = UnionK1 extends "name" | "weight" | "age" | "gender" ? true : false; //true
type InK1 = {
	[key in UnionK1]: number;
};
// type InK1 = {
// 	name: number;
// 	weight: number;
// 	age: number;
// 	gender: number;
// }

interface BasicAddress {
	name?: string;
	street: string;
	city: string;
	country: string;
	postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
	unit: string;
}

interface Human<K> {
	p1: K;
	p2: K;
}

// class Person<T> implements Human<T> {
// 	private p1: T;
// 	private p2: T;
// 	constructor(p1: T, p2: T) {
// 		this.p1 = p1;
// 		this.p2 = p2;
// 	}

// 	setArray = ():T[] => {
// 		return T[];
// 	};
// }

// unreachable code
process.exit(0);
console.log("process.exit(0) 停止程序");
