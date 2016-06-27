var React = require('react');

module.exports = React.createClass({
	render:function(){
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" onClick={this.props.routes.home}>Notes</a>
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							{/* <li ><a href="#">Link <span className="sr-only">(current)</span></a></li>*/}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
});
