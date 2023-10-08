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

/* 12. ConstructorParameters<Type> */
