import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

class AdminIndex extends React.Component {
    constructor() {
        super();        
    }

    render() {
        const data = JSON.stringify(this.props.data,null,2);
        const total = JSON.stringify(this.props.total,null,2);
        const navInstance = (
            <div>
                <pre><code className="json">{total}</code></pre>
                <pre><code className="json">{data}</code></pre>
            </div>
        );

        return navInstance;        
    }
}
 
export default AdminIndex;