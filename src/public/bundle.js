'use strict';

var Routes = require('../routes/react.jsx');
var Client = require('react-engine/lib/client');

// Include all view files. Browerify doesn't do
// this automatically as it can only operate on
// static require statements.
require('./views/app.jsx');
require('./views/header.jsx');
require('./views/layout.jsx');
require('./views/tabPanel.jsx');
require('./views/form.jsx');
require('./views/admin.jsx');

// boot options
var options = {
    routes: Routes,
    // supply a function that can be called
    // to resolve the file that was rendered.
    viewResolver: function(viewName) {
        return require('./views/' + viewName);
    }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
    Client.boot(options);
});
