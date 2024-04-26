/* eslint-disable @typescript-eslint/no-empty-function */
// ts-nocheck

/*
# [迭代器([Symbol.iterator]or `[Symbol.asyncIterator]`) 和 生成器(yield)](https://blog.openreplay.com/deep-dive-into-iterators-iterables-and-generators/)

+ 实现迭代器其实就是根据语言提供的迭代器接口,实现一些符合要求的方法
+ 集合对象 -> 迭代器 ->遍历 :
+ 迭代器是什么?
  + 迭代器就是一个对象,在集合对象遍历时,运行时会**自动调用**迭代器提供的next方法来获取下一个要迭代的对象,异步迭代器同理

+ `yield`有什么作用
  + `yield`语法只有在`Generate`函数`function*`中才有作用,用于暂停这个函数的执行,要想继续执行,需要调用`next`方法
  + `yield`其实是有返回值的,这个返回值通常是由生成器函数调用的`next`方法里的参数决定的
## [JS的迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)
+ 迭代器确实是一种协议,而不是内置的实现或者语法,相当于是一种JS给我们提供的约定,按照约定实现指定的方法,就可以实现 对象的可迭代

### (同步)迭代协议
+ `迭代协议`分为两部分: `可迭代协议(iterable protocol)`和`迭代器协议(iterator protocol)`,这两个又是环环相扣的

1. 可迭代协议(iterable protocol)实现
  + 怎么成为一个可迭代的对象:
    要成为可迭代对象,对象必须实现 `@@iterator`方法,对象或者原型链上必须有一个名为 `@@iterator`的属性,以及至少实现一个符合迭代器要求的`next`方法
    可通过**常量`Symbol.iterator`**访问该属性,
  + `[Symbol.iterator]`方法的特征
    1. 这个函数没有参数
    2. 该方法需要返回一个符合迭代器协议(iterable protocol)的对象(比如**返回一个包含`next`方法的匿名对象,或者this(这个this,this上一样可以找到`next`方法)**)
    3. 该函数可以是普通函数,也可以是生成器(Generator)函数(生成器函数内部,使用yield提供`entry`即条目)
  + 迭代一个可迭代对象时发生了什么:
    + 当一个对象需要被迭代的时候（比如被置入一个 for...of 循环时），首先，会不带参数调用它的 @@iterator 方法，然后使用此方法返回的迭代器获得要迭代的值。

2. 迭代器协议(iterator protocol)实现
  迭代器协议定义了产生一系列值的标准方式
  怎么实现
  只有至少实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器：
    next函数需要为 无参数或者接受一个参数的函数，并返回符合 IteratorResult 接口的**对象**
      IteratorResult接口的对象其实就是一个包含  `done`,`value`属性的对象,这两个属性都是可选的
  + next()
    无参数或者接受一个参数的函数，并返回符合 IteratorResult 接口的对象（见下文）。如果在使用迭代器内置的语言特征（例如 for...of）时，得到一个非对象返回值（例如 false 或 undefined），将会抛出 TypeError（"iterator.next() returned a non-object value"）。

  + `IteratorResult`接口的对象是什么样的?
    所有迭代器协议的方法（next()、return() 和 throw()）都应返回实现 IteratorResult 接口的对象。它必须有以下属性：
    + done 可选
    如果迭代器能够生成序列中的下一个值，则返回 false 布尔值。（这等价于没有指定 done 这个属性。）
    如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
    + value 可选
    迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

  + 实际上，两者都不是严格要求的；如果返回没有任何属性的对象，则实际上等价于 { done: false, value: undefined }。
  如果一个迭代器返回一个 done: true 的结果，则对任何 next() 的后续调用也返回 done: true，尽管这在语言层面不是强制的。
  ** next 方法可以接受一个值，该值将提供给方法体。任何内置的语言特征都将不会传递任何值。传递给生成器 next 方法的值将成为相应 yield 表达式的值。**

  + 可选地，迭代器也实现了 return(value) 和 throw(exception) 方法，这些方法在调用时告诉迭代器，调用者已经完成迭代，并且可以执行任何必要的清理（例如关闭数据库连接）。
  + return(value) 可选
    无参数或者接受一个参数的函数，并返回符合 IteratorResult 接口的对象，其 value 通常等价于传递的 value，并且 done 等于 true。调用这个方法表明迭代器的调用者不打算调用更多的 next()，并且可以进行清理工作。
  + throw(exception) 可选
    无参数或者接受一个参数的函数，并返回符合 IteratorResult 接口的对象，通常 done 等于 true。调用这个方法表明迭代器的调用者监测到错误的状况，并且 exception 通常是一个 Error 实例。

### 异步迭代协议
+ 同样分为 `异步可迭代协议(async iterable protocol)`和`异步迭代器协议(async iterator protocol)` 
  
+ 对象怎么实现`异步可迭代协议(async iterable protocol)`
  实现`[Symbol.asyncIterator]`方法和符合异步迭代器要求的`next`方法

+ 如何实现`[Symbol.asyncIterator]`方法:
  + 返回对象的无参数函数，并且符合异步迭代器协议(async iterator protocol)。
  + 如何符合异步迭代器协议,对象需要至少实现一个符合要求的`next`方法

+ 当对象实现以下方法时,这个对象就符合了`异步迭代器协议(async iterator protocol)`
  + next()
    无参数或者接受一个参数的函数，并返回 promise。promise 兑现为一个对象，该对象符合 IteratorResult 接口，并且这些属性与同步迭代器有着相同的语义。
  + return(value) 可选
    无参数或者接受一个参数的函数，并返回 promise。promise 兑现为一个对象，该对象符合 IteratorResult 接口，并且这些属性与同步迭代器有着相同的语义。
  + throw(exception) 可选
    无参数或者接受一个参数的函数，并返回 promise。promise 兑现为一个对象，该对象符合 IteratorResult 接口，并且这些属性与同步迭代器有着相同的语义。

### 生成器
	+ 生成器函数什么?
		+ 生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。
	+ 生成器函数怎么创建
		+ 生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。(除了箭头,其他生成的方法都可以,包括Class里的静态函数)
	+ 生成器函数干了什么?
		+ 调用生成器函数会产生一个生成器对象。生成器对象**一开始处于暂停执行（suspended）的状态。**与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 `next()`方法。调用这个方法会让生成器开始或恢复执行。
	+ 生成器对象如何生成,特性是什么
		+ 生成器对象本身就是一个可迭代对象,可通过 `for of`等来遍历,就不用显式调用`next`方法了
		+ 初次调用生成器函数时生成的为生成器对象
			```js
				// yield可以暂停Generator`function*`函数,而yield的返回值由next函数参数来决定
				function* test_generator() {
					console.log("不调用next不执行");
					const a = yield 2; // yield的返回值由下一次生成器函数调用next函数参数决定的
					console.log(a);
				}

				const g = test_generator(); // 初次调用并不会执行函数体内的任何一行代码,返回了一个生成器,只有在初次调用next后才会执行代码
				console.log(
					g,
					"generator",
					"调用Generator函数时,相当于生成这个函数签名的Generator实例",
				);
				console.log(
					g[Symbol.iterator](),
					"Generator的迭代器是自引用的,调用迭代器方法后返回的还是本身的Generator实例",
				);
				console.log(g.next()); //调用next方法返回迭代器对象 { value: 2, done: false }
				console.log(g.next("a")); // yield的返回值由 next的参数决定
			```
		+ **初次调用并不会执行函数体内的任何一行代码,返回了一个生成器,只有在初次调用next后才会执行代码**
		+ 生成器对象也实现了`Iterator`接口,它们默认的迭代器是自引用的,调用这个迭代器方法返回的还是本身(当前的生成器实例)
	+ 生成器函数的执行 暂停和恢复
		+ 生成器函数代码遇到`yield`会暂停执行,保留作用域,使用`生成器函数的实例`调用`next`方法,继续执行
		+ 同一个生成器函数生成的两个`Generator`实例,调用`next`不会互相影响
		+ `yield`的关键字**必须**出现在生成器函数的定义中,即便是在 生成器函数中**嵌套定义一个函数**再使用`yield`也会报错
		+ `yield*`语法,可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象(比如使用yield遍历一个数组时)，从而一次产出一个值
		   ```js
				function* generatorFn() {
					// for (let i of [1, 2, 3]) {
					// 	yield i;
					// }
					// 相当于
					yield* [1, 2, 3];// `yield*`用于增强`yield`,迭代可迭代对象
				}

				let generatorInstance = generatorFn(); // 生成Generator实例,这个实例本身就是一个可迭代对象
				generatorInstance.next();

				for (let i of generatorInstance) {
					// `Generator`实例本身就是一个可迭代对象,因为它实现了`[Symbol.Iterator]`(自引用)和`next`方法
					console.log(i);
					// 依次打印 2,3而不是1,2,3
				}
			 ```
	+ `Generator`实例的三个方法
		+ 显示调用`next`方法如`g.next()`或者`g.next('传给yield要返回的参数')`,初始化执行以及恢复生成器函数内部因为`yield`或者`yield*`而暂停的函数
		+ 显示调用 `g.return()`可提前终止迭代
		+ 显示调用 `g.throw()`用于报错,如果生成器函数内部没有处理,g就会提前终止

### `for...of`遍历是怎么知道什么时候该停止遍历的
	+ **其实 `yield`的作用可以用来简化迭代器的实现,相当于自动实现了 `next`方法**
	+ 对于使用 `yield`的生成器函数
		关于for...of循环如何知道何时停止的问题，这是因为生成器实例实现了迭代器协议。当生成器函数中没有更多的yield语句时，生成器实例的next()方法会返回一个对象，其done属性为true，表示迭代已经完成。for...of循环会检查这个done属性，当它为true时，循环就会停止。
		```js
			// `yield*`迭代可迭代对象
			function* generatorFn() {
				for (let i of [1, 2, 3]) {
					yield i;
				}
			}

			let generatorInstance = generatorFn(); // 生成Generator实例,这个实例本身就是一个可迭代对象
			generatorInstance.next();

			for (let i of generatorInstance) {
				// `Generator`实例本身就是一个可迭代对象,因为它实现了`[Symbol.Iterator]`(自引用)和`next`方法
				console.log(i);
				// 依次打印 2,3而不是1,2,3
			}
		```
	+ 手动实现`next`方法,没有yield属性的对象,需要手动在`next`函数的返回中返回一个对象,在合适的条件下使得属性`done`为`true`,一定要返回,不然使用`for of`遍历的时候就死循环了
				```js
				// 手动根据条件返回{done:true},使得遍历停止
					let iterable = {
							array: [1, 2, 3],
							index: 0,
							next: function() {
								if (this.index < this.array.length) {
									return { value: this.array[this.index++], done: false };
								} else {
									return { value: undefined, done: true };
								}
							},
							[Symbol.iterator]: function() { return this; }
						};

						for (let value of iterable) {
							console.log(value); // 依次打印 1, 2, 3
						}
				```


				```js
				// 不使用生成器函数,也不主动返回{done:true},会造成无限遍历的死循环
					let iterable = {
						next: function() {
							return { value: 1, done: false };
						},
						[Symbol.iterator]: function() { return this; }
					};

					// 这个循环会无限循环下去，因为next方法永远返回的对象的done属性为false
					for (let value of iterable) {
						console.log(value);
					}
				```

*/

// #ts-ignore
const str = "abc";
str[Symbol.iterator](); // StringIterator {},`[Symbol.iterator]`方法调用返回一个迭代器, Stringl内置类型内部实现的一个StringIterator迭代器对象

const arr1 = [123, 45, 67];
// 显式调用迭代器对象
const iter = arr1[Symbol.iterator](); // 因为这个`@@iterator`方法一定会返回一个迭代器
console.log(iter); //Array Iterator {}
console.log(iter.next()); //{value: 123, done: false}
console.log(iter.next()); //{value: 123, done: false}
console.log(iter.next()); //{value: 123, done: false}

const myIterator = {
	next() {
		console.log("is next");
	},
	[Symbol.iterator]: function () {
		return this;
	},
};

// 箭头函数 不能生成器
const arrow_generator = () => {};

class Foo1 {
	// 静态函数 也可以
	static *generator() {}
	// 私有函数 可以定义为生成器函数
	*generator() {}
}

// yield可以暂停Generator`function*`函数,而yield的返回值由next函数参数来决定
function* test_generator() {
	console.log("不调用next不执行");
	const a = yield 2; // yield的返回值由下一次生成器函数调用next函数参数决定的
	console.log(a);
}

const g = test_generator(); // 初次调用并不会执行函数体内的任何一行代码,返回了一个生成器,只有在初次调用next后才会执行代码
console.log(
	g,
	"generator",
	"调用Generator函数时,相当于生成这个函数签名的Generator实例",
);
console.log(
	g[Symbol.iterator](),
	"Generator的迭代器是自引用的,调用迭代器方法后返回的还是本身的Generator实例",
);
console.log(g.next()); //调用next方法返回迭代器对象 { value: 2, done: false }
console.log(g.next("a")); // yield的返回值由 next的参数决定

/* async await 版本 */
async function asyncFunction() {
	const result = await doSomethingAsync();
	console.log(result);
}

/* 生成器函数版本 */

function doSomethingAsync() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("2000");
		}, 2000);
	});
}

function* generator() {
	const result = yield doSomethingAsync();
	console.log(result);
}

const gen = generator();
gen.next().value.then(result => gen.next(result));

function* generatorFn() {
	// for (let i of [1, 2, 3]) {
	// 	yield i;
	// }
	// 相当于
	yield* [1, 2, 3]; // `yield*`用于增强`yield`,迭代可迭代对象
}

const generatorInstance = generatorFn(); // 生成Generator实例,这个实例本身就是一个可迭代对象
generatorInstance.next();

for (const i of generatorInstance) {
	// `Generator`实例本身就是一个可迭代对象,因为它实现了`[Symbol.Iterator]`(自引用)和`next`方法
	console.log(i);
	// 依次打印 2,3而不是1,2,3
}

// 对 class 实现一个迭代器
/* 
在 Rust 中，迭代器可以被收集（collect）是因为 Rust 的标准库中定义了一个叫做 FromIterator 的 trait，它的作用是从一个迭代器创建一个集合。collect 方法就是使用这个 trait 来工作的。当你调用 collect 方法时，Rust 的类型推断系统会根据上下文来决定应该使用哪个 FromIterator 的实现。
在你的例子中，HashMap 有一个 FromIterator 的实现，所以你可以从一个迭代器收集元素到 HashMap 中。
JavaScript 中没有类似的概念，但是你可以使用 Array.from 或者扩展运算符（...）来从一个迭代器创建一个数组。
Rust 的迭代器确实是显式的，你需要调用 iter 或者 into_iter 方法来获取一个迭代器。这是因为 Rust 的设计者选择了这样的设计，他们认为这样可以让代码更清晰，更容易理解。
JavaScript 的迭代器是隐式的，你可以直接在 for...of 循环或者其他需要迭代器的地方使用一个可迭代对象。这是因为 JavaScript 的设计者选择了这样的设计，他们认为这样可以让代码更简洁，更容易编写。

*/
class YearList {
	constructor(start = 2023, end = 2028) {
		this.start = start;
		this.end = end;
		this.nextPoint = start;
	}

	[Symbol.iterator]() {
		return this; // this是YearList的实例,而实例的原型链上有next方法,for...of会自动查找原型链上的next方法
	}

	next() {
		if (this.nextPoint <= this.end) {
			// next方法挂载在 实例上,可以获取到this.end
			const result = { value: this.nextPoint, done: false };
			this.nextPoint++;
			return result;
		}
		return { value: undefined, done: true };
	}
}

const yearList = new YearList();

for (const y of yearList) {
	console.log(y, "y");
}

const arr3 = Array.from(yearList); //为什么是空数组
/*
	记住这个特性: **当一个对象需要被迭代的时候（比如被置入一个 for...of 循环时），首先，会不带参数调用它的 @@iterator 方法，然后使用此方法返回的迭代器获得要迭代的值。**

	因为this.nextPoint只在初始化的时候被赋值了(`this.nextPoint=this.start`),
	当 for...of执行完成以后,this.nextPoint已经=this.end了
	继续迭代时,Array.from遍历时,初次遍历会无参数调用`[Symbol.iterator]`方法,但是this.nextPoint这时还是等于this.end所以已经不符合条件走不下去,直接退出遍历了,
	解决办法就是在初次调用`[Symbol.iterator]`方法时,都给它重新赋值即可
	 */

class YearListA {
	constructor(start = 2023, end = 2028) {
		this.start = start;
		this.end = end;
	}

	[Symbol.iterator]() {
		let nextPoint = this.start; //每次开始迭代时,都重新赋值
		let end = this.end;
		return {
			next() {
				console.log(this, "this"); //next是普通函数不是挂载在类型下面的公共函数了,现在的this是[Symbol.iterator]方法返回的匿名对象
				// if (nextPoint <= this.end) { 不能用this.end,因为next函数里面的this是包裹这个next方法的匿名对象
				if (nextPoint <= end) {
					const result = { value: nextPoint, done: false };
					nextPoint++;
					return result;
				}
				return { value: undefined, done: true };
			},
		};
	}
}

const yearList2 = new YearListA();

for (const y of yearList2) {
	console.log(y, "y");
}

// Array.from 或者 扩展运算符`...`实际也是用于遍历可迭代对象的,并收集成一个数组的,相当于`rust`中的`这一句 `
console.log(Array.from(yearList2));
console.log({ ...yearList2 });
console.log([...yearList2]);
