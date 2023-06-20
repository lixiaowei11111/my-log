/* 
当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。
比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。
*/

interface ObserverType {
	type: string;
	update(data: unknown): void;
}

interface SubjectType {
	observers: Array<Observer>;
	subscribe(observer: Observer): void; // 普通函数
	unsubscribe(observer: Observer): void; // 箭头函数
	notify: (data: unknown) => void;
}

// 定义观察者类 可以有多个
class Observer implements ObserverType {
	public type: string;
	constructor(type: string) {
		this.type = type;
	}
	update(data: unknown) {
		//定义一个 被观察者 通知 所有的观察者的方法
		console.log(`${this.type} Received data: ${data}`);
	}
}

// 定义被观察者类 ,只能有一个, 且需要记住有哪些观察者类(subscribe),有变化时,循环调用observer实例方法
class Subject implements SubjectType {
	public observers: Observer[];
	constructor() {
		this.observers = [];
	}
	subscribe(observer: Observer): void {
		this.observers.push(observer);
	}

	unsubscribe(observer: Observer): void {
		this.observers = this.observers.filter(item => item != observer);
	}

	notify = (data: unknown) => {
		this.observers.forEach(observer => observer.update(data));
	};
}

const subject = new Subject(); // 创建被观察者实例

const observer1 = new Observer("observer1"); // 创建观察者实例 多个
const observer2 = new Observer("observer2");

subject.subscribe(observer1); //observer subscribe(订阅) 被观察者
subject.subscribe(observer2);

subject.notify("subject object execute notify method"); // 被观察者执行操作,并通知订阅后的观察者们

// observer1 Received data: subject object execute notify method
// observer2 Received data: subject object execute notify method

subject.unsubscribe(observer2);

subject.notify(
	"subject object execute notify method after unsubscribe observer2",
);

// observer1 Received data: subject object execute notify method
