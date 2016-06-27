var React = require('react');

module.exports = React.createClass({
	render: function(){
		return (
			<div className="row" style={{borderBottom: '1px solid #ccc'}}>
				<div className="col-xs-6">{this.props.created}</div>
				<div className="col-xs-3"><a className="note-title" onClick={this.props.routes.editNote}>{this.props.title}</a></div>
			</div>
		);
	}
});
