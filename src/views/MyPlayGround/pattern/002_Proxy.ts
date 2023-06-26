/** Proxy Reflection */
const person = {
	name: "ybb",
	age: 42,
};

const personProxy = new Proxy(person, {
	get: (obj, prop) => {
		console.log(
			`The value of ${prop.toString()} from ${Reflect.get(obj, prop)}`,
		);
	},
	set: (obj, prop, value) => {
		console.log(
			`Changed ${prop.toString()} from ${
				obj[prop as keyof typeof obj]
			} to ${value}`,
		);
		return Reflect.set(obj, prop, value);
	},
});

person.name; // 不会触发
personProxy.name; // 操纵代理对象触发

personProxy.age = 1;
