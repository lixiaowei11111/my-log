export function debounce<T extends (...args: any[]) => unknown>(
	cb: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>): void => {
		const later = () => {
			clearTimeout(timer);
			cb(...args);
		};
		clearTimeout(timer);
		timer = setTimeout(later, delay);
	};
}
