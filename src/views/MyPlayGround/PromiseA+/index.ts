/* eslint-disable @typescript-eslint/no-empty-function */

//1.Promise构造函数必须携带的executor;创建Promsie时,必须传递一个executor, 他会在Promise的构造函数中自动执行(并且是同步执行),其暴露了两个函数 resolve,和 reject
const p = new Promise((resolve, reject) => {});
console.log("new Promsie((resolve,reject)=>{})", p); // Promise {<pending>}

const p1 = new Promise((resolve, reject) => {
	resolve(null);
});
console.log("new Promsie((resolve,reject)=>{resolve(null)})", p1); // Promise {<fulfilled>: null}

const p2 = new Promise((resolve, reject) => {
	reject(null);
});
console.log("new Promsie((resolve,reject)=>{reject(null)})", p2); // Promise {<rejected>: null}

//2. resolve 方法这个静态方法能够包装任何非期约值，包括错误对象，并将其转换为解决的期约。因此，也可能导致不符合预期的行为：
const p3 = Promise.resolve(() => {
	throw new Error("foo");
});
const p4 = Promise.resolve(new Error("foo"));
console.log(p3); //Promise {<fulfilled>: ƒ}
console.log(p4); // Promise {<fulfilled>: Error: foo
setTimeout(console.log, 0, p3); // Promise {<fulfilled>: ƒ}
setTimeout(console.log, 0, p4); // Promise {<fulfilled>: Error: foo

// 3. 使用Promise的reject会抛出一个异步错误,Uncaught (in promise) null,
try {
	throw new Error("foo");
} catch (e) {
	console.log(e); // Error: foo
}
try {
	Promise.reject(new Error("bar"));
} catch (e) {
	console.log(e);
}
// Uncaught (in promise) Error: bar

//4. 注意:Promise并非一开始就必须处于pending状态，然后通过执行器函数才能转换为fulfilled或者rejected状态。Promise 状态机特性:pending、 fulfilled(resolved)、 rejected; 状态一旦改变就不可撤销或者更改,比如从pending变成 resolved,就不能再变回pending,或者在变成 rejected
const pStateMachine = new Promise((resolve, reject) => {
	resolve(null); //一旦执行resolve,下面的rejected就不会生效了,同时也不会抛出Promie的错误
	reject(null);
	console.log("is executor"); // is executor
});
console.log(pStateMachine); // Promise {<fulfilled>: null}

//5. Promise的静态方法 reject 和 resolve

//5.1 resolve
const p5 = new Promise((resolve, reject) => {
	resolve(null);
});
// 相当于
// const p1 = Promise.resolve(null);
console.log("Promise.resolve(null) :", p5); // Promise {<fulfilled>: null}
// 5.2 reject  Promise.resolve()类似，Promise.reject()会实例化一个拒绝的期约并抛出一个异步错（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）
const p6 = new Promise((resolve, reject) => reject());
// 相当于
const p7 = Promise.reject();

// 6. Promise的实例方法 Promise.prototype.then,(then方法的返回值是一个新的Promise对象,其状态规则见下文,方便链式调用)
/**
 * Promise.prototype.then()是为Promise实例添加处理程序的主要方法。这个 then()方法接收最多
 * 两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话，
 * 则会在期约分别进入“fulfilled”和“rejected”状态时执行。
 */
function onResolved(id: string) {
	setTimeout(console.log, 0, id, "resolved");
}
function onRejected(id: string) {
	setTimeout(console.log, 0, id, "rejected");
}
const p8 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const p9 = new Promise((resolve, reject) => setTimeout(reject, 3000));
p8.then(
	() => onResolved("p8"),
	() => onRejected("p8"),
);
p9.then(
	() => onResolved("p9"),
	() => onRejected("p9"),
);
//（3 秒后）
// p8 resolved
// p9 rejected

// 6.1 Promise.prototype.then()方法返回一个**新的Promise实例**：
const p10 = new Promise(() => {});
const p11 = p10.then();
setTimeout(console.log, 0, p10); // Promise <pending>
setTimeout(console.log, 0, p11); // Promise <pending>
setTimeout(console.log, 0, p10 === p11); // false
/**
 * 6.1.1 Promsie.prototype.then 最重要的特性:(这个特性极大的方便链式调用类比于 回调中多层嵌套回调)
 * 这个新Promise实例基于 onResovled 处理程序的**返回值**构建。换句话说，该处理程序的返回值会通过
 * Promise.resolve()包装来生成新Promise。如果没有提供这个处理程序，则 Promise.resolve()就会
 * 包装上一个Promise解决之后的值。如果没有显式的返回语句，则 Promise.resolve()会包装默认的返回
 * 值 undefined。
 */
const p12 = Promise.resolve("foo");
// const p12 = Promise.reject("foo") 被then包装后,返回的是 Promise <rejected>
// 6.1.2 若调用 then()时不传处理程序，则原样向后传
const p13 = p12.then();
setTimeout(console.log, 0, p13); // Promise <resolved>: foo

// 这些都一样,
const p14 = p12.then(() => undefined);
const p15 = p12.then(() => {});
const p16 = p12.then(() => Promise.resolve());
setTimeout(console.log, 0, p14); // Promise <resolved>: undefined
setTimeout(console.log, 0, p15); // Promise <resolved>: undefined
setTimeout(console.log, 0, p16); // Promise <resolved>: undefined

// 6.1.3 如果有显式的返回值，则 Promise.resolve()会包装这个值：
const p17 = p12.then(() => "bar");
const p18 = p12.then(() => Promise.resolve("bar"));
setTimeout(console.log, 0, p17); // Promise <resolved>: bar
setTimeout(console.log, 0, p18); // Promise <resolved>: bar
// Promise.resolve()保留返回的期约
const p19 = p12.then(() => new Promise(() => {}));
const p20 = p12.then(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p19); // Promise <pending>
setTimeout(console.log, 0, p20); // Promise <rejected>: undefined

// 6.1.4 抛出异常会返回拒绝的期约：

const p21 = p12.then(() => {
	throw "baz";
});
// Uncaught (in promise) baz
setTimeout(console.log, 0, p21); // Promise <rejected> baz

// 6.1.5 注意，返回错误值不会触发上面的拒绝行为，而会把错误对象包装在一个解决的期约中：

const p22 = p12.then(() => Error("qux"));
setTimeout(console.log, 0, p22); // Promise <resolved>: Error: qux

// 6.2 Promise.prototype.catch方法
/**
 * Promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：
 * onRejected 处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用 Promise.prototype.then(null, onRejected)。
 * 在返回新Promise实例方面，Promise.prototype.catch()的行为与 Promise.prototype.then()
 * 的 onRejected 处理程序是一样的。
 */

// 6.3 Promise.prototype.finally
/**
 * Promise.prototype.finally()方法用于给期约添加 onFinally 处理程序，这个处理程序在期
 * 约转换为解决或拒绝状态时都会执行。这个方法可以避免 onResolved 和 onRejected 处理程序中出
 * 现冗余代码。但 onFinally 处理程序没有办法知道Promise的状态是解决还是拒绝，所以这个方法主要用
 * 于添加清理代码。
 */

// 6.3.1 Promise.prototype.finally 的返回值
// Promise.prototype.finally()方法返回一个新的Promise实例：
const pf1 = new Promise(() => {});
const pf2 = pf1.finally();
setTimeout(console.log, 0, pf1); // Promise <pending>
setTimeout(console.log, 0, pf2); // Promise <pending>
setTimeout(console.log, 0, pf1 === pf2); // false
// 这里都会原样后传
const pf3 = pf1.finally(() => undefined);
const pf4 = pf1.finally(() => {});
const pf5 = pf1.finally(() => Promise.resolve());
const pf6 = pf1.finally(() => "bar");
const pf7 = pf1.finally(() => Promise.resolve("bar"));
const pf8 = pf1.finally(() => Error("qux"));
setTimeout(console.log, 0, pf2); // Promise <resolved>: foo
setTimeout(console.log, 0, pf3); // Promise <resolved>: foo
setTimeout(console.log, 0, pf4); // Promise <resolved>: foo
setTimeout(console.log, 0, pf5); // Promise <resolved>: foo
setTimeout(console.log, 0, pf6); // Promise <resolved>: foo
setTimeout(console.log, 0, pf7); // Promise <resolved>: foo
setTimeout(console.log, 0, pf8); // Promise <resolved>: foo
/**
 * 1. 这个新Promise实例不同于 then()或 catch()方式返回的实例。因为 onFinally 被设计为一个状态
 * 无关的方法，所以在大多数情况下它将表现为**父Promise的传递**。对于已解决状态和被拒绝状态都是如此。
 * 2. 如果返回的是一个待定的期约，或者 onFinally 处理程序抛出了错误（显式抛出或返回了一个拒
 * 绝期约），则会返回相应的期约（待定或拒绝），如下所示：
 */
// Promise.resolve()保留返回的期约
const pf9 = pf1.finally(() => new Promise(() => {}));
const pf10 = pf1.finally(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, pf9); // Promise <pending>
setTimeout(console.log, 0, pf10); // Promise <rejected>: undefined
const pf11 = pf1.finally(() => {
	throw "baz";
});
// Uncaught (in promise) baz
setTimeout(console.log, 0, p11); // Promise <rejected>: baz

// 6.4 链式Promise
// Promise.prototype.then; Promise.prototype.catch;Promise.prototype.finally 方法 都会返回一个新的Promise对象,而每个新的Promise又有自己的实例方法
const pc = new Promise<void>((resolve, reject) => {
	console.log("first");
	resolve();
});
pc.then(() => console.log("second"))
	.then(() => console.log("third"))
	.then(() => console.log("fourth"));

// 6.5 Promise合成 Promise.all Promise.race

// 7. 异步函数

// 7.1 async
/**
 * 异步函数如果使用 return 关键字返回了值（如果没有 return 则会返回 undefined），
 * 这个值会被 Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。在
 */
async function foo2() {
	console.log(1);
	return 3;
}
console.log(
	"async 函数的返回值,被Promise.resovle包装,等同于 .then方法",
	foo2(),
); // Promise {<fulfilled>: 3}

// 7.2 await
async function foo() {
	console.log(2);
	console.log(await Promise.resolve(8));
	console.log(9);
}
async function bar() {
	console.log(4);
	console.log(await 6);
	console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
/**
 * 运行时会像这样执行上面的例子：
(1) 打印 1；
(2) 调用异步函数 foo()；
(3)（在 foo()中）打印 2；
(4)（在 foo()中）await 关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务；
(5) 期约立即落定，把给 await 提供值的任务添加到消息队列；
(6) foo()退出；
(7) 打印 3；
(8) 调用异步函数 bar()；
(9)（在 bar()中）打印 4；
(10)（在 bar()中）await 关键字暂停执行，为立即可用的值 6 向消息队列中添加一个任务；
(11) bar()退出；
(12) 打印 5；
(13) 顶级线程执行完毕；
(14) JavaScript 运行时从消息队列中取出解决 await 期约的处理程序，并将解决的值 8 提供给它；
(15) JavaScript 运行时向消息队列中添加一个恢复执行 foo()函数的任务；
(16) JavaScript 运行时从消息队列中取出恢复执行 bar()的任务及值 6；
(17)（在 bar()中）恢复执行，await 取得值 6；
(18)（在 bar()中）打印 6；
(19)（在 bar()中）打印 7；
(20) bar()返回；
(21) 异步任务完成，JavaScript 从消息队列中取出恢复执行 foo()的任务及值 8；
(22)（在 foo()中）打印 8；
(23)（在 foo()中）打印 9；
(24) foo()返回。
 */
/**
 * TC39 对 await 后面是期约的情况如何处理做过一次修改。修改后，本例中的 Promise.resolve(8)只会生成一个
 * 异步任务。因此在新版浏览器中，这个示例的输出结果为 123458967。实际开发中，对于并行的异步操作我们通常
 * 更关注结果，而不依赖执行顺序。
 */
// 实际上真正的顺序也确实是 123458967了
