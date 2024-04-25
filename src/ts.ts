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
