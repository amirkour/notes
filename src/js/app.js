
var Home = require('./jsx/home.jsx'),
	AboutComp = require('./jsx/about.jsx'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	reactRouter = require('react-router'),
	Router = reactRouter.Router,
	Route = reactRouter.Route,
	Link = reactRouter.Link,
	browserHistory = reactRouter.browserHistory;

ReactDOM.render((
	<div>
		<div>
			<Link to="/">Home</Link>
		</div>
		<Router history={browserHistory}>
			<Route path="/" component={Home} />
			<Route path="/about" component={AboutComp} />
		</Router>
	</div>
	), document.getElementById('stuff')
);

/*
TODO
- how to gracefully handle errors in the gulpfile?  you can repro errors in jsx easily: just put
  two top-level elements together. it complains that they need a parent element
- how does this.props.children work in rendering?
*/