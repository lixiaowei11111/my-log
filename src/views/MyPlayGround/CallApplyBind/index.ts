// call, apply, 和 bind 都是函数的方法，用于改变函数的 this 上下文。它们的区别在于参数形式和行为。

// call: 第一个参数是要设置的 this 值，其余参数是传给函数的参数，参数以逗号分隔。

// apply: 第一个参数是要设置的 this 值，第二个参数是一个数组或类数组，包含将传递给函数的参数。

// bind: 返回一个新的函数，第一个参数是新函数的 this 值，其余参数是传给新函数的参数。bind 不会立即执行函数，而是返回一个绑定了 this 值的新函数。

// 原理：这三个函数方法都是通过改变函数内部的 this 上下文来实现的。

// 下面是这三个方法的简单实现：
// 扩展 Function 类型
interface Function {
	myCall(context: any, ...args: any[]): any;
	myApply(context: any, args: any[]): any;
	myBind(context: any, ...args: any[]): any;
}
// 实现 call
Function.prototype.myCall = function (context, ...args) {
	context = context || window;
	context.fn = this;
	const result = context.fn(...args);
	delete context.fn;
	return result;
};

// 实现 apply
Function.prototype.myApply = function (context, args) {
	context = context || window;
	context.fn = this;
	const result = context.fn(...args);
	delete context.fn;
	return result;
};

// 实现 bind
Function.prototype.myBind = function (context, ...args) {
	// const self = this;
	return function () {
		return this.apply(context, args);
	};
};
