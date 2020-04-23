import { LOAD_AUTHOR_SUCCESS } from './types';
import { getAuthors } from '../../api/authorApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
	return { type: LOAD_AUTHOR_SUCCESS, authors };
}

export const loadAuthors = () => (dispatch) => {
	dispatch(beginApiCall());
	return getAuthors().then((authors) => dispatch(loadAuthorsSuccess(authors))).catch((error) => {
		dispatch(apiCallError(error));
		throw error;
	});
};
