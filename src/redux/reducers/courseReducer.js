import { CREATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC } from '../actions/types';
import initialState from './initilaState';

export default function courseReducer(state = initialState.courses, action) {
	switch (action.type) {
		case CREATE_COURSE_SUCCESS:
			return [ ...state, action.course ];
		case UPDATE_COURSE_SUCCESS:
			return state.map((course) => {
				return course.id === action.course.id ? action.course : course;
			});
		case LOAD_COURSES_SUCCESS:
			return action.courses;
		case DELETE_COURSE_OPTIMISTIC:
			return state.filter(course => course.id !== action.course.id)
		default:
			return state;
	}
}
