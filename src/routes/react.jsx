import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../public/views/app.jsx';
import TabPanel from '../public/views/tabPanel.jsx';
import Admin from '../public/views/admin.jsx';

var routes = module.exports = (
    <Route>
        <Route path="/admin" component={App} >         
            <IndexRoute name='admin' component={Admin}/>         
        </Route>
        <Route path="/judge/" component={App} >            
            <Route path=":judgeId/:hashKey" name='tabPanel' component={TabPanel}/>             
        </Route>
    </Route>
    
);