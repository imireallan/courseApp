import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
	<div className="jumbotron">
		<h2>Ooops! Page Not Found. <span role="img" aria-label="emoji">😥</span></h2>
		<Link to="/" className="btn btn-lg btn-primary">
			Go back to the Home page
		</Link>
	</div>
);

export default PageNotFound;
