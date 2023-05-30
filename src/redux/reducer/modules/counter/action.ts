import ActionType from "@REDUX/constants";
import type { ReduxAction } from "@REDUX/interface";

// increment
export const increment = (): ReduxAction => ({
	type: ActionType.INCREMENT,
});

// decrement
export const decrement = (): ReduxAction => ({
	type: ActionType.DECREMENT,
});
