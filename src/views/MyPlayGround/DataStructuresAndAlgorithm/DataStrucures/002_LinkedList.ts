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
		this.head = null;
		this.tail = null;
	}

	private addToHead(node: Node<K, V>) {
		node.prev = null;
		node.next = this.head;

		if (this.head) {
			this.head.prev = node;
		} else {
			this.tail = node;
		}

		this.head = node;
	}

	private removeNode(node: Node<K, V>) {
		if (node.prev) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}

		if (node.next) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}
	}

	private moveToHead(node: Node<K, V>) {
		this.removeNode(node);
		this.addToHead(node);
	}

	get(key: K): V | undefined {
		const node = this.cache.get(key);

		if (node) {
			this.moveToHead(node);
			return node.value;
		}

		return undefined;
	}

	put(key: K, value: V) {
		const node = this.cache.get(key);

		if (node) {
			node.value = value;
			this.moveToHead(node);
		} else {
			const newNode = new Node(key, value);
			this.cache.set(key, newNode);
			this.addToHead(newNode);

			if (this.cache.size > this.capacity) {
				this.cache.delete(this.tail!.key);
				this.removeNode(this.tail!);
			}
		}
	}
}
