var React = require('react');
var ReactDOM = require('react-dom');
var Promise = require('es6-promise').Promise;


var data = [
	{id: 1, author: "Pete Hunt", text: "This is one commentsadsf"},
	{id: 2, author: "Jordan Walke", text: "This is *another* commentadf"}
];

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>

				{this.props.children}
			</div>
		);
	}
});
var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var CommentBox = React.createClass({
	getInitialState: function(){
		return {data:[]};
	},
	componentDidMount: function(){
		// TODO - get promises in the browser
		// new Promise(function(fulfill,reject){
		// 	fulfill("whatup");
		// }).then(function(str){
		// 	alert(str);
		// });
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments!?</h1>
				<CommentList data={this.state.data}/>
				<CommentForm />
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox data={data} />,
	document.getElementById('stuff')
);