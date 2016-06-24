
var React = require('react'),
	Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Notes!?</h1>
				<p>I'm the homepageasdf!?</p>
				<Link to="/about">link about!?</Link>
				<a href="/about">about!</a>
			</div>
		);
	}
});
