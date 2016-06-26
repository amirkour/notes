var React = require('react'),
	NoteTableRow = require('./note-table-row.jsx');

module.exports = React.createClass({
	render: function(){

		var noteNodes = this.props.notes.map(function(note){
			return (
				<NoteTableRow {...note} key={note._id} />
			);
		});
		return (
			<div className="container" >
				<div className="row" style={{borderBottom: '2px solid black', fontWeight: 'bold'}}>
					<div className="col-xs-6">created</div>
					<div className="col-xs-3">title</div>
				</div>
				{noteNodes}
			</div>
		);
	}
});
