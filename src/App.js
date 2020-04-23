import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';
import CoursesPage from './components/courses/CoursesPage';
import ManageCoursePage from './components/courses/ManageCoursePage';

function App() {
	return (
		<div className="container">
			<Header />
			<ToastContainer autoClose={3000} hideProgressBar />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/courses" component={CoursesPage} />
				<Route path="/course/:slug" component={ManageCoursePage} />
				<Route path="/course" component={ManageCoursePage} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;
