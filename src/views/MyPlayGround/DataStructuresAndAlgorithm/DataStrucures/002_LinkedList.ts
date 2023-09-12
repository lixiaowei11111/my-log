// 1. 链表的种类有 单向链表， 循环链表， 双向链表，以及双向循环链表

import { ValueOptions } from "postcss/lib/container";

// 使用双向循环链表来实现一个LRU缓存算法
class Node<K, V> {
	key: K;
	value: V;
	prev: Node<K, V> | null;
	next: Node<K, V> | null;
	constructor(key: K, value: V) {
		this.key = key;
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

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
