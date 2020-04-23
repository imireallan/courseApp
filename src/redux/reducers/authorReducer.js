import { LOAD_AUTHOR_SUCCESS } from '../actions/types';
import initialState from './initilaState';

export default function courseReducer(state = initialState.authors, action) {
	switch (action.type) {
		case LOAD_AUTHOR_SUCCESS:
			return action.authors;
		default:
			return state;
	}
}
