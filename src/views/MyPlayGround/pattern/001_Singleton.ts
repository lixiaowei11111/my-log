/**
 * 单例模式的优点：

节省系统资源：由于单例模式只有一个实例对象，可以避免大量重复创建对象，节省系统资源。
方便实现对共享资源的控制：由于单例模式只有一个实例对象，可以方便地实现对共享资源的控制，避免多个线程同时访问共享资源。
单例模式的缺点：

由于单例模式只有一个实例对象，所以它的扩展性不如其他设计模式。如果需要扩展单例模式的功能，可能需要修改原有的代码。
单例模式可能会导致代码的耦合性增加。因为单例模式的实现方式通常涉及到全局变量或静态变量，这些变量可能会被其他代码所引用，导致代码的耦合性增加。
单例模式的应用场景：

日志类：由于日志类只需要一个实例对象，可以使用单例模式来实现。
数据库连接池：由于数据库连接池需要管理连接对象，可以使用单例模式来实现。
线程池：由于线程池需要管理线程对象，可以使用单例模式来实现。
配置文件管理器：由于配置文件管理器只需要一个实例对象，可以使用单例模式来实现。
 */

class Singleton {
	private static instance: Singleton;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}
	public static getInstance(): Singleton {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}
}
