import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../public/views/app.jsx';
import TabPanel from '../public/views/tabPanel.jsx';

var routes = module.exports = (
  	<Route path="/judge/" component={App} >
        <Route path=":judgeId" name='tabPanel' component={TabPanel}/> 
    </Route>
);
