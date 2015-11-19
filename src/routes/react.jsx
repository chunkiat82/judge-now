import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from '../public/views/app.jsx';
import TabPanel from '../public/views/tabPanel.jsx';
import AdminIndex from '../public/views/adminIndex.jsx';
import AdminSendResults from '../public/views/adminSendResults.jsx';
import AdminSendLink from '../public/views/adminSendLink.jsx';
import AdminDelete from '../public/views/adminDelete.jsx';
import AdminLayout from '../public/views/adminLayout.jsx';

var routes = module.exports = (
    <Route>
        <Route path="/admin/" component={App} >
            <Route component={AdminLayout}>
                <IndexRoute name='adminIndex' component={AdminIndex}/>
                <Route path="send/results" name='adminSendResults' component={AdminSendResults}/>
                <Route path="send/link" name='adminSendLinks' component={AdminSendLink}/>
                <Route path="delete" name='adminDelete' component={AdminDelete}/>
            </Route>
        </Route>
        <Route path="/judge/" component={App} >            
            <Route path=":judgeId/:hashKey" name='tabPanel' component={TabPanel}/>             
        </Route>
    </Route>
    
);