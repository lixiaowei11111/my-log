function log(
	target: unknown,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	console.log("target:", target);
	console.log("propertyKey", propertyKey);
	console.log("descriptor", descriptor);
	const originalMethod = descriptor.value;
	descriptor.value = function (...args: any[]) {
		console.log(
			`Calling ${propertyKey} with arguments: ${JSON.stringify(args)}`,
		);
		const result = originalMethod.apply(this, args);
		console.log(`Result of ${propertyKey}: ${JSON.stringify(result)}`);
		return result;
	};
	return descriptor;
}

class Calculator {
	@log
	public add(a: number, b: number) {
		return a + b;
	}
}

const calculator = new Calculator();
calculator.add(2, 3); // Calling add with arguments: [2,3]  Result of add: 5
