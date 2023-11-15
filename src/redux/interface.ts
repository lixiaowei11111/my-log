export interface ReduxAction {
	type: string;
	payload?: any;
}

export interface CounterState {
	val: number;
}
