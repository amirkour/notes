
var Home = require('./jsx/home.jsx'),
	React = require('react'),
	ReactDOM = require('react-dom');

ReactDOM.render(<Home />, document.getElementById('stuff'));

/*
TODO
- how to gracefully handle errors in the gulpfile?  you can repro errors in jsx easily: just put
  two top-level elements together. it complains that they need a parent element
- how does this.props.children work in rendering?
*/