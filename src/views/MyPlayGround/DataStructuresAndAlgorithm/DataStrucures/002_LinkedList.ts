// 1. 链表的种类有 单向链表， 循环链表， 双向链表，以及双向循环链表
// 使用双向循环链表来实现一个LRU缓存算法
class ListNode<T> {
	key: number;
	value: T;
	next: ListNode<T> | null;
	constructor(key: number, value: T) {
		this.key = key;
		this.value = value;
		this.next = null;
	}
}

class LRUCache<T> {
	private capacity: number; // LRUCache容量
	private cache: Map<number, ListNode<T>>;
	private head: ListNode<T>;
	private tail: ListNode<T>;
	constructor(capacity: number) {
		this.capacity = capacity;
		this.cache = new Map();
		this.head = new ListNode(0, null as unknown as T);
		this.tail = new ListNode(0, null as unknown as T);
		this.head.next = this.tail;
		this.tail.next = null;
	}

	// private removeNode
}
