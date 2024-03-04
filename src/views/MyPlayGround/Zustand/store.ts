import { create } from "zustand";
import { combine } from "zustand/middleware";
interface CounterState {
	counter: number;
}

interface CounterAction {
	increase: () => void;
	remove: () => void;
	update: (k: number) => void;
}
export const useCounterStore = create<CounterState & CounterAction>(set => {
	return {
		counter: 0,
		increase: () => set(state => ({ counter: state.counter + 1 })),
		remove: () => set(() => ({ counter: 0 })),
		update: newCounter => set({ counter: newCounter }),
	};
});

// 或者使用redux的style来写
interface State {
	counter: number;
}
interface Actions {
	increment: (qty: number) => void;
	decrement: (qty: number) => void;
}

interface Action {
	type: keyof Actions; // increment | decrement; // 类型推断
	qty: number;
}

const counterReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "increment":
			return { counter: state.counter + action.qty };
		// zustand和redux一样,需要以immutbale的方式来对待状态的更新,当需要改变深层嵌套下的某一属性时,非常麻烦,需要使用immer等其他工具来方便实现
		case "decrement":
			return { counter: state.counter - action.qty };
		default:
			return state;
	}
};
interface Dispatch {
	dispatch: (action: Action) => void;
}
export const useCountStore = create<State & Dispatch>(set => ({
	counter: 0,
	dispatch: (action: Action) => set(state => counterReducer(state, action)),
}));
