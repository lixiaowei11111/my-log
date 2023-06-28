import { COUNTERENUM } from "./actions";
import type { COUNTERACTIONTYPE } from "./actions";

const initialState = { count: 0 };

const counterReducer = (
	state: typeof initialState,
	action: COUNTERACTIONTYPE,
) => {
	switch (action.type) {
		case COUNTERENUM.INCREMENT:
			return { count: state.count + action.payload };

		case COUNTERENUM.DECREMENT:
			return { count: state.count - Number(action.payload) };

		default:
			throw new TypeError(
				`the action type exclude ${
					(action as COUNTERACTIONTYPE).type
				}  in the COUNTERENUM`,
			);
	}
};

export default counterReducer;
