import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import * as apiStatusActions from '../../redux/actions/apiStatusActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export class CoursesPage extends Component {
	state = {
		redirectToAddCoursePage: false
	};
	componentDidMount() {
		const { actions, courses, authors } = this.props;
		if (!courses.length) actions.courseActions.loadCourses();
		if (!authors.length) actions.authorActions.loadAuthors();
	}

	handleDelete = async (course) => {
		const { actions: { courseActions: { deleteCourseAction } } } = this.props;
		toast.success('Delete Successfull');
		try { 
			await deleteCourseAction(course)
		} catch(error) {
			toast.error(`Delete failed: ${error.message}`, {autoClose: false})
		}
	};

	render() {
		const { courses, loading } = this.props;
		const { redirectToAddCoursePage } = this.state;
		return (
			<React.Fragment>
				{loading ? (
					<Spinner />
				) : (
					<React.Fragment>
						<h2>Courses</h2>
						<button
							className="btn btn-primary mb-1"
							onClick={() => {
								this.setState({ redirectToAddCoursePage: true });
							}}
						>
							Add Course
						</button>
						{redirectToAddCoursePage && <Redirect to="course" />}
						<CourseList courses={courses} handleDelete={this.handleDelete} />
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ courses, authors, apiStatus }) => ({
	courses: !!authors.length
		? courses.map((course) => {
				return {
					...course,
					authorName: authors.find((author) => author.id === course.authorId).name
				};
			})
		: [],
	authors,
	loading: apiStatus > 0
});

const mapDispatchTOProps = (dispatch) => ({
	actions: {
		courseActions: bindActionCreators(courseActions, dispatch),
		authorActions: bindActionCreators(authorActions, dispatch),
		apiStatusActions: bindActionCreators(apiStatusActions, dispatch)
	}
});

export default connect(mapStateToProps, mapDispatchTOProps)(CoursesPage);
