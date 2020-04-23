import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { loadCourses, createCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../mockData';
import Spinner from '../common/Spinner';

const ManageCoursePage = ({ loadAuthors, loadCourses, courses, authors, createCourse, apiStatus, ...props }) => {
	const [ course, setCourse ] = useState({ ...props.course });
	const [ errors, setErrors ] = useState({});
	const [ saving, setSaving ] = useState(false);
	useEffect(
		() => {
			if (!courses.length) {
				loadCourses();
			} else {
				setCourse({ ...props.course });
			}
			if (!authors.length) loadAuthors();
		},
		[ props.course, authors, courses, loadAuthors, loadCourses ]
	);

	function handleChange(event) {
		const {
			name,
			value
		} = event.target; /* this destructure avoids the event getting garbage collected so that it's available within the nested setcourse callback*/
		setCourse((prev) => ({
			...prev,
			[name]: name === 'authorId' ? parseInt(value) : value
		}));
	}

	function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};
		if (!title) errors.title = 'Title is required.';
		if (!authorId) errors.author = 'Author is required.';
		if (!category) errors.category = 'Category is required.';
		setErrors(errors);
		return Object.keys(errors).length === 0;
	}
	async function handleSave(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		console.log(!formIsValid());
		setSaving(true);
		try {
			await createCourse(course);
			toast.success('Saving was successfull...');
			props.history.push('/courses');
		} catch (error) {
			setSaving(false);
			setErrors({ onSave: error.message });
		}
	}
	return (
		<React.Fragment>
			{courses.length === 0 || authors.length === 0 ? (
				<Spinner />
			) : (
				<CourseForm
					course={course}
					errors={errors}
					authors={authors}
					onChange={handleChange}
					onSave={handleSave}
					saving={saving}
				/>
			)}
		</React.Fragment>
	);
};

function getCourseBySlug(courses, slug) {
	return courses.find((course) => course.slug === slug) || null;
}

const mapStateToProps = ({ courses, authors, apiStatus }, ownProps) => {
	const slug = ownProps.match.params.slug;
	const course = courses.length > 0 && slug ? getCourseBySlug(courses, slug) : newCourse;
	return {
		course,
		courses,
		authors
	};
};

const mapDispatchTOProps = {
	loadCourses,
	loadAuthors,
	createCourse
};

export default connect(mapStateToProps, mapDispatchTOProps)(ManageCoursePage);
