import React from 'react';

export default class json extends React.Component {

	render() {      	
      	const s = JSON.stringify(this.props.data,null,2);
        return (
        	<html>
        	<head>
        		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css"/>
				<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
        	</head>
        	<body>
	            <div>	            	
	            	<pre><code class="json">{s}</code></pre>
	            	<script>hljs.initHighlightingOnLoad();</script>
	            </div>
            </body>
            </html>              
        )      
	}
}