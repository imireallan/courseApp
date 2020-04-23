import { BEGIN_API_CALL, API_CALL_ERROR } from '../actions/types';
import initialState from './initilaState';

const actionTypeEndsInSuccess = (type) => {
	console.log(type.substring(type.length - 8));
	return type.substring(type.length - 8) === '_SUCCESS';
};

export default function courseReducer(state = initialState.apiCallsInProgress, action) {
	const { type } = action;
	if (type === BEGIN_API_CALL) {
		return state + 1;
	} else if (actionTypeEndsInSuccess(type) || type === API_CALL_ERROR) {
		return state - 1;
	}
	return state;
}
