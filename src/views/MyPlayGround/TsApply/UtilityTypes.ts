/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
export default {};
// TypeScript

/* 1. Awaited<T> 是一个用于获取 Promise 或异步函数返回值的类型工具; 接受一个类型参数 T，它可以是一个 Promise 类型或异步函数类型。它会返回 T 类型中所包含的 Promise 解析后的值的类型。 */
type Aa = Awaited<Promise<string>>;
// type Aa = string

type Ab = Awaited<Promise<Promise<number>>>;
// type A = string

type Ac = Awaited<boolean>;
// type Ac = boolean

type Ad = Awaited<boolean | Promise<string | boolean>>;
// type Ad = string | boolean

async function fetchData(): Promise<{ name: string; age: number }> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ name: "aaaa", age: 123 });
		});
	});
}

type Ae = Awaited<ReturnType<typeof fetchData>>;
// type Ae = {
// 	name: string;
// 	age: number;
// }

/* 手动实现一个Awaited<T> */
type MyAwaited<T> = T extends Promise<infer R> ? R : T;
type MyAa = MyAwaited<Promise<string>>;
// type MyAa = string

type MyAb = MyAwaited<Promise<Promise<number>>>;
// type MyAb = string

type MyAc = MyAwaited<boolean>;
// type MyAc = boolean

type MyAd = MyAwaited<boolean | Promise<string | boolean>>;
// type MyAd = string | boolean

async function myFetchData(): Promise<{ name: string; age: number }> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ name: "aaaa", age: 123 });
		});
	});
}

type MyAe = MyAwaited<ReturnType<typeof fetchData>>;
// type MyAe = {
// 	name: string;
// 	age: number;
// }

/* 2. Partial<T> 是一个用于将对象类型的所有属性设置为可选的类型工具; 接受一个类型参数 T，它可以是一个对象类型。它会返回一个新的类型，该类型与 T 相同，但所有属性都被标记为可选。 */
interface Pa {
	title: string;
	description: string;
}

function pUpdatePa(todo: Pa, fieldsToUpdate: Partial<Pa>) {
	return { ...todo, ...fieldsToUpdate };
}

const pTodo1: Pa = {
	title: "organize desk",
	description: "clear clutter",
};

const pTodo2 = pUpdatePa(pTodo1, { description: "throw out trash" });

// 手动实现一个Partial
type MyPartial<T> = {
	[K in keyof T]?: T[K]; // "key"of 重点在key,主要是编辑对象所有的属性,并以联合类型返回,而in操作符则是用来遍历联合类型的,两个刚好可以配合使用
};

/* 3. Required<T> 构建一个类型，其中包含将 Type 的所有属性设置为 required。与 Partial 相反。  */
interface RProps {
	a?: number;
	b?: number;
}
const rObj: RProps = { a: 5 };

// const rObj2: Required<RProps> = { a: 5 }; //报错 类型 "{ a: number; }" 中缺少属性 "b"，但类型 "Required<RProps>" 中需要该属性。

// 手动实现一个 Required
type MyRequired<T> = {
	[K in keyof T]-?: T[K];
};
// -?通过此映射操作符，去掉属性可选
// T[P]设置属性类型

/* 4. Readonly<T> 构建一个类型，其中所有的属性都设置为只读（readonly），意味着构建的类型的属性不能被重新赋值。 */
interface ROTodo {
	title: string;
}
const roTodo: Readonly<ROTodo> = {
	title: "is object freeze",
};

// roTodo.title = "222"; //报错 无法为“title”赋值，因为它是只读属性。

// Object.freeze;
// function freeze<Type>(obj: Type): Readonly<Type>;

// 手动实现一个 Readonly
type MyReadonly<T> = {
	readonly [K in keyof T]: T[K];
};

/* 5. Record<Keys,Type> 用于创建一个类型，该类型将指定的键映射到特定的值类型。它的作用是创建一个具有指定键和值类型的对象类型。 */
interface RecordCatInfo {
	age: number;
	bread: string;
}
type RecordCatName = "miffy" | "boris" | "moddred"; //type可以声明basic type 和 union type ,interface只能声明对象或者函数

const cats: Record<RecordCatName, RecordCatInfo> = {
	miffy: { age: 23, bread: "my" },
	boris: { age: 122, bread: "mi" },
	moddred: { age: 253, bread: "ffy" },
};
// 手动实现 MyRecord
type MyRecord<K extends keyof any, T> = {
	[P in K]: T;
};

/* 6.Pick<Type,Keys> 用于从给定类型中选择指定属性，创建一个新的类型。这可以用于从一个较大的类型中提取出我们所需的属性，以便在其他地方使用。 */
interface PickPerson {
	name: string;
	age: number;
	address: string;
	email: string;
}

type PickPersonInfo = Pick<PickPerson, "name" | "age">;
// type PickPersonInfo = {
// 	name: string;
// 	age: number;
// }
const pickPersonInfo: PickPersonInfo = {
	name: "lihua",
	age: 28,
};
// 手动实现 Pick
type MyPick<T, K extends keyof T> = {
	[P in K]: T[P];
};
type MyPickPersonInfo = MyPick<PickPerson, "name" | "age">;
const myPickPersonInfo: PickPersonInfo = {
	name: "lihua",
	age: 28,
};

// extends的三种作用TS中 : 1. 类型继承;2. 类型约束;3. 条件类型,类似于三元运算符

/* 7. Omit<Type,Keys> 通过从Type中选择所有属性，然后移除Keys（字符串字面量或字符串字面量的联合），构建一个类型。与Pick相反。 */
interface OmitPerson {
	name: string;
	age: number;
	address: string;
	email: `${string}@${string}.com`;
}

type OmitPersonInfo = Omit<OmitPerson, "name" | "age">;
const omitPersonInfo: OmitPersonInfo = {
	address: "lihua",
	email: "xxx@163.com",
};
type MyOmit<T, K extends keyof T> = {
	[P in keyof T as P extends K ? never : P]: T[P];
};
type MyOmitPersonInfo = Omit<OmitPerson, "name" | "age">;
const myOmitPersonInfo: MyOmitPersonInfo = {
	address: "lihua",
	email: "xxx@163.com",
};

/* 8. Exclude<UnionType,ExcludeMembers> 通过从UnionType中排除所有可分配给ExcludedMembers的联合成员，构建一个类型。 */
type ExT0 = Exclude<"a" | "b" | "c", "a">;
// type ExT0 = "b" | "c"

type ExT1 = Exclude<"a" | "b" | "c", "a" | "c">;
// type ExT1 = "b"

type ExT2 = Exclude<string | number | (() => void), Function>;
// type ExT2 = string | number

// 以 | 开头的方式，我们可以更直观地理解这是一个联合类型，提供了多个可能的类型选项。这种写法使代码更易读、更易理解。
type ExShape =
	| { kind: "circle"; radius: number }
	| { kind: "square"; x: number }
	| { kind: "triangle"; x: number; y: number };

type ExT3 = Exclude<ExShape, { kind: "circle" }>;
// type ExT3 = {
// 	kind: "square";
// 	x: number;
// } | {
// 	kind: "triangle";
// 	x: number;
// 	y: number;
// }

// 手动实现一个Exclude
type MyExclude<T, U> = T extends U ? never : T;
type ExT4 = MyExclude<ExShape, { kind: "circle" }>;
// type ExT4 = {
// 	kind: "square";
// 	x: number;
// } | {
// 	kind: "triangle";
// 	x: number;
// 	y: number;
// }

/* 9. Extract<Type,Union> 用于从联合类型 T 中提取可以赋值给类型 U 的成员类型, 其实就是公共类型,两种类型的交集 */
type ET0 = Extract<"a" | "b" | "c", "a" | "f">;
// type ET0 = "a"
type ET1 = Extract<string | number | (() => void), Function>;
// type ET1 = () => void

type EShape =
	| { kind: "circle"; radius: number }
	| { kind: "square"; x: number }
	| { kind: "triangle"; x: number; y: number };
type ET2 = Extract<EShape, { kind: "circle1" }>; // never
type ET3 = Extract<EShape, { kind: "circle" }>;
// type ET3 = {
// 	kind: "circle";
// 	radius: number;
// };
type MyExtract<T, U> = T extends U ? T : never;

/* 10.NonNullable<Type> 从类型中排除掉 null 和 undefined，并构建一个新的类型。 */
type NonN0 = NonNullable<string | number | undefined | undefined>;
// type NonN0 = string | number
type NonN1 = NonNullable<{ a: undefined } | undefined>;
// type NonN1 = {
// 	a: undefined;
// };

/* 11. Parameters<T> 从函数类型 T 中提取其参数类型的**元组**类型;对于重载函数，这将是最后一个签名的参数；请参阅在条件类型中进行类型推断。 */
declare function pF1(arg: { a: number; b: string }): void;
type PT0 = Parameters<() => string>;
// type PT0 = []

type PT1 = Parameters<(str: string) => void>;
// type PT1 = [str: string]

type PT2 = Parameters<<T>(arg: T) => T>;
// type PT1 = [str: string]

type TP3 = Parameters<typeof pF1>;
// type TP3 = [arg: {
// 	a: number;
// 	b: string;
// }]
type TP4 = Parameters<any>;
// type TP4 = unknown[]

type TP5 = Parameters<never>;
// type TP5 = never

// type TP6 = Parameters<Function>;
// 报错: 类型“Function”不满足约束“(...args: any) => any”。
// 类型“Function”提供的内容与签名“(...args: any): any”不匹配。

// 手动实现Parameters<Type>
type MyParameters<T extends (...arg: any) => any> = T extends (
	...arg: infer P
) => any
	? P
	: never;
type MYPT1 = MyParameters<(str: string) => void>;
// type MYPT1 = [str: string]

/* 12. ConstructorParameters<Type> 从构造函数类型的类型中构造一个元组或数组类型。
它会生成一个包含所有参数类型的元组类型（如果 Type 不是函数类型，则生成一个永远为 never 的类型）。 */
type CPT0 = ConstructorParameters<ErrorConstructor>;
// type CPT0 = [message?: string | undefined]

type CPT1 = ConstructorParameters<FunctionConstructor>;
// type CPT1 = string[]

type CPT2 = ConstructorParameters<RegExpConstructor>;
// type CPT2 = [pattern: string | RegExp, flags?: string | undefined]

class CP {
	constructor(a: number, b: string) {
		console.log("cp class constructor");
	}
}
type CPType = typeof CP;
type CPT3 = ConstructorParameters<CPType>;
// type CPT3 = [a: number, b: string]

type MyConstructorParameters<T extends abstract new (...args: any[]) => any> =
	T extends abstract new (...args: infer P) => any ? P : never;
type CPT4 = MyConstructorParameters<CPType>;
// type CPT3 = ConstructorParameters<CPType>;

/* 13. ReturnType<Type> 构造一个类型，该类型由函数Type的返回类型组成。 */
declare function rtF1(): { a: number; b: string };
type RTT0 = ReturnType<() => string>;
// type RTT0 = string
type RTT1 = ReturnType<(str: string) => void>;
// type RTT1 = void
type RTT2 = ReturnType<<T>() => T>;
// type RTT2 = unknown

declare function ff2<T>(): T;
function ff1<T>(a: T): T {
	// 函数实现逻辑
	return a;
}

type RTT3 = ReturnType<<T extends U, U extends Array<number>>() => T>;
// type RTT3 = number[]
type RTT4 = ReturnType<typeof rtF1>;
// type RTT4 = {
// 	a: number;
// 	b: string;
// }
type RTT5 = ReturnType<any>;
// type RTT5 = any

type RTT6 = ReturnType<never>;
// type RTT6 = never

// type RTT7 = ReturnType<string>;
// 类型“string”不满足约束“(...args: any) => any”。

type MyReturnType<T extends (...args: any) => any> = T extends (
	...args: any
) => infer P
	? P
	: any;
type RTT8 = MyReturnType<<T extends U, U extends Array<number>>() => T>;
// type RTT8 = number[]

/* 14. InstanceType<Type> 用于获取类构造函数实例类型。它接受一个类构造函数类型作为参数，并返回该类的实例类型。 */
class ITC {
	x = 0;
	y = 0;
	public a = 123;
	private z = 123;
	protected b = 222;
	static c = 111;
	// abstract fn1(): void; // 抽象方法只能出现在抽象类中
}

abstract class ITC2 {
	x = 0;
	y = 0;
	public a = 123;
	private z = 123;
	protected b = 222;
	static c = 111;
	abstract fn1(): void;
	fn2() {}
}
type ITT0 = InstanceType<typeof ITC>;
// type ITT0 = ITC
type ITT1 = InstanceType<any>;
// type ITT0 = ITC
type ITT2 = InstanceType<never>;
// type ITT2 = never
// type IIT3 = InstanceType<string>;
// 类型“string”不满足约束“abstract new (...args: any) => any”。
// type ITT5 = InstanceType<ITC2>;
// 类型“ITC2”不满足约束“abstract new (...args: any) => any”。
//   类型“ITC2”提供的内容与签名“new (...args: any): any”不匹配。

type MyInstanceType<T extends abstract new (...args: any) => any> =
	T extends abstract new (...args: any) => infer P ? P : any;
type ITT6 = MyInstanceType<typeof ITC>;
// type ITT6 = ITC

/* 15. ThisParameterType<Type> 提取**函数**类型中 this 参数的类型 */

/* 16. OmitThisParameter<Type> */
/* 17. ThisType<Type> */
/* 18. Uppercase<StringType> 将输入类型 T 的名称设为大写。 */
type UCT0 = Uppercase<"Abc1哈哈">;
// type UCT0 = "ABC1哈哈"
/* 19. Lowercase<StringType> 将输入类型 T 的名称设为小写。 */
type LCT0 = Lowercase<"Abc1哈哈">;
// type LCT0 = "abc1哈哈"
/* 20. Capitalize<StringType> 输入类型 T 的首字母大写。*/
type CLT0 = Capitalize<"313bbcda">;
// type CLT0 = "313bbcda"
type CLT1 = Capitalize<"bcada">;
// type CLT1 = "Bcada"
/* 21. Uncapitalize<StringType> 输入类型 T 的首字母小写。 */
type UCLT1 = Uncapitalize<"Acada">;
// type UCLT1 = "acada"

// 手动实现 Uppercase 或者 Uncapitalize
// 前置条件 infer的妙用 获取字符串的位置
type AString = "ABC";
type GetInitialType<S extends string> = S extends `${infer I}${infer Rest}`
	? I
	: any;
type GetExcludeInitialType<S extends string> =
	S extends `${infer I}${infer Rest}` ? Rest : any;
type GetInitialTest = GetInitialType<AString>;
// type GetInitialTest = "A"
type GetExcludeInitialTest = GetExcludeInitialType<AString>;
// type GetExcludeInitialTest = "BC"
