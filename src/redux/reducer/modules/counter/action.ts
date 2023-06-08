import ActionTypeEnum from "@CONSTANTS/ActionTypeEnum";
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
