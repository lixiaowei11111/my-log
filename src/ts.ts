type PositiveInteger<T extends number> = `${T}` extends
	| "0"
	| `-${any}`
	| `${any}.${any}`
	? never
	: T;
function test<T extends number>(n: PositiveInteger<T>) {
	/***/
}

export default test;

const doThing = async (a: number): Promise<number> => {
	await a;
	return a;
};

const getB = async (a: number): Promise<number> => {
	await a;
	return a;
};

const getC = async (a = 0, b: number) => {
	await a;
	await b;
	return a + b;
};

const a = 1;
const b = 2;
const d = 4;

// 引用了上层作用域的东西,判定为必要的展示,没引用判断为不必要的展示
doThing(a).then(a => getB(a).then(b => getC(a, b)));


// 引用了上层作用域的东西,判定为必要的展示,没引用判断为不必要的展示
doThing(a).then(a => getB(a).then(b => getC(b, d)));
