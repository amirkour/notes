
var Home = require('./jsx/home.jsx'),
	NewNote = require('./jsx/note-create.jsx'),
	EditNote = require('./jsx/note-edit.jsx'),
	Layout = require('./jsx/layout.jsx'),
	React = require('react'),
	ReactDOM = require('react-dom'),

	nav = {
		routes: {
			editNote: function(){
				ReactDOM.render( <Layout {...nav}>{editNoteView}</Layout>, stuffNode );
			},
			newNote: function(){
				ReactDOM.render( <Layout {...nav}>{newNoteView}</Layout>, stuffNode );
			},
			home:function(){
				ReactDOM.render( <Layout {...nav}>{homeView}</Layout>, stuffNode );
			}
		}
	},

	newNoteView = <NewNote {...nav} />,
	editNoteView = <EditNote {...nav} />,
	homeView = <Home {...nav} />,
	stuffNode = document.getElementById('stuff');

nav.routes.home();

/*
TODO
- how to gracefully handle errors in the gulpfile?  you can repro errors in jsx easily: just put
  two top-level elements together. it complains that they need a parent element
  	- need to add an error handler in the pipeline in the task.  gulp.watch doesn't give you
  	  a way to do it easily
- how does this.props.children work in rendering?
	- it's the children of that element.  so if you render this:
	<Bla>
		<div>hi</div>
	</Bla>

	inside the 'bla' component, this.props.children refers to the div
*/