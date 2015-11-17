import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../public/views/app.jsx';
import TabPanel from '../public/views/tabPanel.jsx';

var routes = module.exports = (
  	<Route path="/" component={App} >
        <IndexRoute name='wizard' component={TabPanel}/> 
    </Route>
);
