type Callback<T> = (data: T) => void;

interface AbstractEventDispatcher<T> {
	subscribe(callback: Callback<T>): void;
	unsubscribe(callback: Callback<T>): void;
	dispatch: (data: T) => void;
}

class EventDispatcher<T> implements AbstractEventDispatcher<T> {
	private subscriptions: Callback<T>[];
	constructor(subscriptions?: Callback<T>[]) {
		// \?表示可选参数
		this.subscriptions = subscriptions || [];
	}

	public subscribe(callback: Callback<T>): void {
		this.subscriptions.push(callback);
	}

	public unsubscribe(callback: Callback<T>): void {
		this.subscriptions = this.subscriptions.filter(item => item !== callback);
	}

	public dispatch(data: T): void {
		for (const callback of this.subscriptions) {
			callback(data);
		}
	}
}

interface User {
	name: string;
	age: number;
}

const dispatcher = new EventDispatcher<User>();

const callback1: Callback<User> = user => {
	console.log(`${user.name} is ${user.age} years old callback1 execute`);
};

const callback2: Callback<User> = user => {
	console.log(`${user.name} is a user callback2 execute`);
};

dispatcher.subscribe(callback1);
dispatcher.subscribe(callback2);

dispatcher.dispatch({ name: "a", age: 20 });

dispatcher.unsubscribe(callback2);

dispatcher.dispatch({ name: "b", age: 22 });
