import { useReducer } from "react";

import { Button } from "antd";
import counterReducer from "./reducers";
import { COUNTERENUM } from "./actions";

const initialState = { count: 0 };

/**
 * useReducer
 * useReducer(reducer,initialState)=> [state,dispatch]
 */

const CounterByUserReducer: React.FC = () => {
	const [state, dispatch] = useReducer(counterReducer, initialState);
	return (
		<>
			Counter:{state.count}
			<Button
				onClick={() => dispatch({ type: COUNTERENUM.INCREMENT, payload: 2 })}
			>
				INCREMENT 2
			</Button>
			<Button
				onClick={() => dispatch({ type: COUNTERENUM.DECREMENT, payload: "5" })}
			>
				DECREMNT 5
			</Button>
			{/* <Button onClick={() => dispatch({ type: "a", payload: "5" })}>
				throw type error
			</Button> */}
		</>
	);
};

export default CounterByUserReducer;
