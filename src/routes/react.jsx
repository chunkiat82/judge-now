import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../public/views/app.jsx';
import Form from '../public/views/form.jsx';

var routes = module.exports = (
  	<Route path="/" component={App} >
        <IndexRoute name='wizard' component={Form}/> 
    </Route>
);
