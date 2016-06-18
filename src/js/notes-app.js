var React = require('react');
var ReactDOM = require('react-dom');
var Promise = require('es6-promise').Promise;




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
		var self = this;
		new Promise(function(fulfill,reject){
			$.ajax({
				url: '/test_dataz',
				dataType:'json',
				method:'GET',
				success:function(data,status,jqxhr){ fulfill(data,status,jqxhr); }.bind(this),
				error:function(jqxhr,strStatus,strError){ reject(jqxhr,strStatus,strError); }.bind(this)
			});
		}).then(function(result){
			self.setState({data: result});
		}).catch(function(jqxhr,status,error){
			strError = "unknown error";
			if(jqxhr instanceof Error)
				strError = jqxhr.message || "no error given";
			else if(typeof jqxhr.responseText === 'string')
				strError = jqxhr.responseText;
			else if(typeof status === 'string')
				strError = status;
			else if(typeof error === 'string')
				strError = error;

			alert('error: ' + strError);
		});
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
	<CommentBox />,
	document.getElementById('stuff')
);
