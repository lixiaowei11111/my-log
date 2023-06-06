import ActionTypeEnum from "@REDUX/constants";
import type { ReduxAction } from "@REDUX/interface";

const { INCREMENT, DECREMENT } = ActionTypeEnum;

// increment
export const increment = (): ReduxAction => ({
	type: INCREMENT,
});

// decrement
export const decrement = (): ReduxAction => ({
	type: DECREMENT,
});
