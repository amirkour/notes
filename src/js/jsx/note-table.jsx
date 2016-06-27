var React = require('react'),
	NoteTableRow = require('./note-table-row.jsx');

module.exports = React.createClass({
	render: function(){

		var noteNodes = null,
			self = this;
		if(this.props.notes && this.props.notes.length > 0){
			noteNodes = this.props.notes.map(function(note){
				return (
					<NoteTableRow {...note} {...self.props} key={note._id} />
				);
			});
		}else{
			noteNodes = <div className="row">No notes</div>;
		}

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
