/* global __DEVELOPMENT__:true */
import React from 'react';

class Layout extends React.Component {

	constructor(){
		super();		
	}

	render() {	    
		return (
			<html>
				<head>
					<meta charSet='utf-8' />
					<meta name="viewport" content="width=device-width, initial-scale=0.7"/>
					<title>
						{'PayPal D&D Judging App'}						
					</title>

					<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
				</head>	
				<body>					
					<div className="vx_foreground-container">
						<div className="vx_mainContent">
							{this.props.children}
						</div>
					</div>					
				  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
				  	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
				  	<script src='/bundle.js'></script>
				</body>		  				 
			</html>
		);
	}
};

export default Layout;

