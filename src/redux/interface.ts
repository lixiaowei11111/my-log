export type ReduxAction = {
	type: string;
	payload?: any;
};

export interface CounterState {
	val: number;
}
