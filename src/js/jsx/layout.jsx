var React = require('react'),
	Header = require('./header.jsx');

module.exports = React.createClass({
	componentWillMount:function(){
		console.log("layout comp will mount");
	},
	componentDidMount:function(){
		console.log("layout comp did mount");
	},
	componentDidUpdate:function(){
		console.log("layout comp did update");
	},
	componentWillUnmount:function(){
		console.log('layout comp will unmount');
	},
	render:function(){
		return (
			<div >
				<Header {...this.props} />
				
				<div className="container">
				{this.props.children}
				</div>
			</div>
		);
	}
});
