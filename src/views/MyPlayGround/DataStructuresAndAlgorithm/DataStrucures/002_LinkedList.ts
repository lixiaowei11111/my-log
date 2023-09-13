// 1. 链表的种类有 单向链表， 循环链表， 双向链表，以及双向循环链表

import { ValueOptions } from "postcss/lib/container";

// 使用双向循环链表来实现一个LRU缓存算法
class Node<K, V> {
	key: K;
	value: V | null;
	prev: Node<K, V> | null;
	next: Node<K, V> | null;
	constructor(key: K, value: V | null) {
		this.key = key;
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

class LinkedList<K, V> {
	head: Node<K, V> | null;
	tail: Node<K, V> | null;
	constructor() {
		this.head = null;
		this.tail = null;
	}

	public append(node: Node<K, V>) {
		if (this.tail) {
			// not null linked list
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		} else {
			// null linked list
			this.head = node;
			this.tail = node;
		}
	}

	public prepend(node: Node<K, V>) {
		if (this.head) {
			node.next = this.head;
			this.head.prev = node;
			this.head = node;
		} else {
			this.head = node;
			this.tail = node;
		}
	}

	public delete(node: Node<K, V>) {
		if (node === this.tail && this.head === node) {
			//1. only one node
			this.head = null;
			this.tail = null;
		} else if (this.head === node) {
			//2. delete head node
			this.head = node.next;
			this.head!.prev = null;
		} else if (this.tail === node) {
			// 3. delete tail node
			this.tail = node.prev;
			this.tail!.next = null;
		} else {
			// 4. delete center node
			const prevNode = node.prev;
			const nextNode = node.next;
			prevNode!.next = nextNode;
			nextNode!.prev = prevNode;
		}
	}

	public find(node: Node<K, V>): Node<K, V> | null {
		let currentNode = this.head;
		while (currentNode !== null) {
			if (currentNode.key === node.key) {
				return currentNode;
			}
			currentNode = currentNode.next;
		}
		return null;
	}
}
/* sentinel linked list */
class SentinelLinkedList<K, V> {
	private head: Node<K, V> | null;
	private tail: Node<K, V> | null;
	private sentinel: Node<K, V> | null;
	constructor() {
		this.sentinel = new Node<K, V>(Symbol() as unknown as K, null);
		this.head = this.sentinel;
		this.tail = this.sentinel;
	}
	public append(node: Node<K, V>) {
		node.prev = this.tail;
		node.next = this.sentinel;
		this.tail!.next = node;
		this.tail = node;
	}

	public prepend(node: Node<K, V>) {
		this.head!.prev = node;
		node.prev = this.sentinel;
		node.next = this.head;
		this.head = node;
	}

	public delete(node: Node<K, V>) {
		node.prev!.next = node.next;
		node.next!.prev = node.prev;
		if (node === this.head) {
			this.head = node.next;
		}
		if (this.tail === node) {
			this.tail = node.prev;
		}
	}

	public find(node: Node<K, V>): Node<K, V> | null {
		let currentNode = this.head;
		while (currentNode !== this.sentinel) {
			if (currentNode!.key === node.key) {
				return currentNode;
			}
			currentNode = currentNode!.next;
		}
		return null;
	}

	public static reverser<K, V>(linkedList: LinkedList<K, V>): LinkedList<K, V> {
		// public static reverser(linkedList: LinkedList<K, V>): LinkedList<K, V> {
		/* 
		在 TypeScript 中，静态成员是属于类本身而不是类的实例。由于类型参数在类的实例化时才会确定具体类型，因此静态成员不能引用类型参数。
		和 TypeScript 类似，C++ 和 Java 中的静态成员也不能引用类型参数。这是因为静态成员在编译时期就被解析和处理，而类型参数的具体类型直到运行时才确定。
		静态成员通常用于类的整体操作和共享状态，不依赖于类的实例。因此，它们不能使用实例相关的类型参数。
		如果你需要在静态成员中使用泛型功能，可以考虑将泛型应用于静态方法而不是静态成员变量。这样可以通过方法参数来传递泛型类型，而不是直接在静态成员中引用类型参数。 
		*/
		return linkedList;
	}
}

/* LRUCache baes 双向链表和HashMap */
class LRUCache<K, V> {
	capacity: number;
	cache: Map<K, Node<K, V>>;
	head: Node<K, V> | null;
	tail: Node<K, V> | null;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.cache = new Map<K, Node<K, V>>();
		this.head = null; // LRUCache的头节点
		this.tail = null; // LRUCache的尾节点
	}

	private addToHead(node: Node<K, V>) {
		node.prev = null;
		node.next = this.head;
		if (this.head) {
			// 链表不为空
			this.head.prev = node;
		} else {
			// 链表为空时
			this.tail = node; // 链表为空时，LRUCache的tail和head都需要指向node
		}
		this.head = node;
	}

	private removeNode(node: Node<K, V>) {
		if (node.prev) {
			// node不为头节点
			node.prev.next = node.next;
		} else {
			// node为头节点时
			this.head = node.next; //删除该node节点后，需要重新定义LRUCache的head
		}

		if (node.next) {
			// node不为tail node
			node.next.prev = node.prev;
		} else {
			// node为tailNode
			this.tail = node.prev; // 重新定义LRUCache的tail
		}
	}

	private moveToHead(node: Node<K, V>) {
		// 1.删除节点 2. 添加到头部
		this.removeNode(node);
		this.addToHead(node);
	}

	get(key: K): V | null {
		const node = this.cache.get(key);
		if (node) {
			// 如果node存在, 则更新使用情况,将其移到最新使用过的key,并返回对应的value
			this.moveToHead(node);
			return node.value;
		}
		return null;
	}

	put(key: K, value: V) {
		// PUT 和 GET 动作都视为使用过
		const node = this.cache.get(key);
		if (node) {
			node.value = value;
			this.moveToHead(node);
		} else {
			const newNode = new Node(key, value);
			this.cache.set(key, newNode);
			this.addToHead(newNode);
			// 是否超过capacity; 如果超过则移除tail的key和node
			if (this.cache.size > this.capacity) {
				this.cache.delete(this.tail!.key);
				this.removeNode(this.tail!);
			}
		}
	}
}

// 示例用法
const cache = new LRUCache<string, number>(2);
cache.put("key1", 1);
cache.put("key2", 2);
console.log(cache.get("key1")); // 输出: 1
cache.put("key3", 3); // key2 将被淘汰
console.log(cache.get("key2")); // 输出: undefined
console.log(cache.get("key3")); // 输出: 3
cache.put("key4", 4); // key1 将被淘汰
console.log(cache.get("key1")); // 输出: undefined
console.log(cache.get("key3")); // 输出: 3
console.log(cache.get("key4")); // 输出: 4

// LinkedList

console.log("LinkedList######################STARTING......");
const linkedList = new LinkedList<number, object>();
linkedList.append(new Node(1, { data: "node1" }));
console.log(linkedList, "linkedList");
linkedList.append(new Node(2, { data: "node2" }));
console.log(linkedList, "linkedList");
linkedList.append(new Node(3, { data: "node3" }));
console.log(linkedList, "linkedList");
linkedList.append(new Node(4, { data: "node4" }));
console.log(linkedList, "linkedList");

console.log("LinkedList######################ENDING......");

// Sentinel LinkedList
console.log("SentinelLinkedList######################STARTING......");
const sentinelLinkedList = new SentinelLinkedList<number, object>();
sentinelLinkedList.append(new Node(1, { data: "node1" }));
console.log(sentinelLinkedList, "sentinelLinkedList");
sentinelLinkedList.append(new Node(2, { data: "node2" }));
console.log(sentinelLinkedList, "sentinelLinkedList");
sentinelLinkedList.append(new Node(3, { data: "node3" }));
console.log(sentinelLinkedList, "sentinelLinkedList");
sentinelLinkedList.append(new Node(4, { data: "node4" }));
console.log(sentinelLinkedList, "sentinelLinkedList");

console.log("SentinelLinkedList######################ENDING......");
