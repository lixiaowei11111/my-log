import type { AnyAction } from "redux";
import type { CounterState } from "@REDUX/interface";
import ActionTypeEnum from "@REDUX/constants";
import { produce } from "immer";

const counterState: CounterState = {
	val: 0,
};
// 使用immer 维护reducer的纯函数
const counterReducer = (
	state: CounterState = counterState,
	action: AnyAction,
) =>
	produce(state, draftState => {
		switch (action.type) {
			case ActionTypeEnum.INCREMENT:
				draftState.val++;
				return draftState;
			case ActionTypeEnum.DECREMENT:
				draftState.val--;
				return draftState;
			default:
				return draftState;
		}
	});

export default counterReducer;
