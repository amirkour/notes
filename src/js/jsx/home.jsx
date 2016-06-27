
var React = require('react'),
	NoteTable = require('./note-table.jsx'),
	Promise = require('es6-promise').Promise,
	$ = require('jquery');

module.exports = React.createClass({
	getInitialState:function(){
		return {notes: []};
	},
	componentDidMount:function(){
		var self = this;
		new Promise(function(fulfill,reject){
			$.ajax({
				url: '/test_dataz',
				success:function(notes){ fulfill(notes); },
				error: function(err){ reject(err); }
			});
		}).then(function(notes){
			self.setState({'notes':notes});
		}).catch(function(err){
			console.log('error fetching notes: ' + err);
		});
	},
	render: function() {
		return (
			<div>
				<h1>Notes!?</h1>
				<p>I'm the homepage!?</p>
				<NoteTable notes={this.state.notes} {...this.props} />
				<p style={{marginTop: '10px'}}>
					<a id="new-note-link" className="btn btn-success" onClick={this.props.routes.newNote}>New Note</a>
				</p>
			</div>
		);
	}
});
