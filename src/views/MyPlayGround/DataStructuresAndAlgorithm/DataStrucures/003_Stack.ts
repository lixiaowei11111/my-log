// 数组栈 叫顺序栈， 链表栈叫做链式栈
// 数组队列叫顺序队列,链表队列链式队列

class Stack<T> {
	private stack: T[];
	public capacity: number;
	constructor(capacity = 0) {
		this.stack = [];
		this.capacity = capacity;
	}

	public push(item: T): void {
		this.stack.push(item);
	}

	public pop(): T | undefined {
		return this.stack.pop();
	}

	public peek(): T | undefined {
		return this.stack[this.stack.length - 1];
	}
}
