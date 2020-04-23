import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC } from './types';
import { getCourses, saveCourse, deleteCourse } from '../../api/courseApi';
import { beginApiCall, apiCallError } from '../actions/apiStatusActions';

export function createCourseSuccess(course) {
	return { type: CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
	return { type: UPDATE_COURSE_SUCCESS, course };
}

export function loadCoursesSuccess(courses) {
	return { type: LOAD_COURSES_SUCCESS, courses };
}

export function deleteCourseOptimistic(course) {
	return { type: DELETE_COURSE_OPTIMISTIC, course };
}

export const loadCourses = () => (dispatch) => {
	dispatch(beginApiCall());
	return getCourses().then((courses) => dispatch(loadCoursesSuccess(courses))).catch((error) => {
		dispatch(apiCallError(error));
	});
};

export const createCourse = (course) => (dispatch, getState) => {
	dispatch(beginApiCall());
	return saveCourse(course)
		.then((savedCourse) => {
			return course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
		})
		.catch((error) => {
			dispatch(apiCallError(error));
			throw error;
		});
};

export const deleteCourseAction = (course) => (dispatch) => {
	dispatch(deleteCourseOptimistic(course));
	return deleteCourse(course.id);
};
