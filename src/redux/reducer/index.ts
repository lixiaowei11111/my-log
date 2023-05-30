import { combineReducers } from "redux";

import counterReducers from "./modules/counter";

const rootReducer = combineReducers({
	counter: counterReducers,
});

export default rootReducer;
