/**
 * @description jest's usual matchers
 */

/**
 * @description 1. toBe toEqual not
 */
describe("common matchers", () => {
	// toBe use Object.is
	test("two plus two is four", () => {
		expect(2 + 2).toBe(4);
	});

	// check object value use toEqual
	test("object assignment", () => {
		const data: any = { one: 1 };
		data["two"] = { c: 4 };
		expect(data).toEqual({ one: 1, two: { c: 4 } });
	});

	// use not check opposite result
	test("object assignment", () => {
		const data: any = { one: 1 };
		data["two"] = { c: 4 };
		expect(data).not.toBe({ one: 1, two: { c: 4 } });
	});
});

/**
 * @description 2. toBeNull;toBeUndefined;toBeTruthy .......
 */
describe("truthness", () => {
	/**
	 * toBeNull matches only null
	 * toBeUndefined matches only undefined
	 * toBeDefined is the opposite of toBeUndefined
	 * toBeTruthy matches anything that an if statement treats as true
	 * toBeFalsy matches anything that an if statement treats as false
	 */

	// check null
	test("null", () => {
		const n = null;
		expect(n).toBeNull();
		// expect(n).toBeUndefined();
		expect(n).not.toBeUndefined();
		expect(n).not.toBeTruthy();
		expect(n).toBeFalsy();
	});

	// check 0
	test("zero", () => {
		const z = 0;
		// expect(z).toBeNull();
		// expect(z).toBeUndefined();
		// expect(z).not.toBeUndefined();
		expect(z).not.toBeTruthy();
		expect(z).toBeFalsy();
	});
});

/**
 * @description 3. toBe;toBeCloseTo;toBeGreaterThan...... check number and float
 */

describe("Numbers", () => {
	test("two plus two", () => {
		const data = 2 + 2;
		expect(data).toBeGreaterThan(3);
		expect(data).toBeGreaterThanOrEqual(4);
		expect(data).toBeLessThan(5);
		expect(data).toBeLessThanOrEqual(4.5);
		expect(data).toBe(4);
		expect(data).toEqual(4);
	});

	test("adding floating point numbers", () => {
		// 浮点数计算有误差
		const value = 0.1 + 0.2;
		expect(value).not.toBe(0.3);
		//expect(value).toBe(0.3); // rounding error
		// expect(received).toBe(expected) // Object.is equality
		// Expected: 0.3
		// Received: 0.30000000000000004
		expect(value).toBeCloseTo(0.3);
	});
});

/**
 * @description 4. toMatch check string regex match
 */
describe("String", () => {
	test("there is no I in team", () => {
		expect("team").not.toMatch(/I/);
	});

	test("but there is a stop in Christoph", () => {
		expect("Christoph").toMatch(/stop/);
	});
});

/**
 * @description 5. toContain check Array and Iterables(Iterators Object Or Structor)
 */
describe("Array and iterable", () => {
	const shoppingList: Array<string> = [
		"diapers",
		"kleenex",
		"trash bags",
		"paper towels",
		"milk",
	];

	test("the shopping list has milk on it", () => {
		expect(shoppingList).toContain("milk");
		expect(new Set(shoppingList)).toContain("milk");
	});
});

/**
 * @description 6. toThrow() exception
 */
describe("compiling android goes as expected", () => {
	function compileAndroidCode() {
		throw new Error("you are using the wrong JDK");
	}

	expect(() => compileAndroidCode()).toThrow();
	// expect(() => compileAndroidCode()).not.toThrow();
});
