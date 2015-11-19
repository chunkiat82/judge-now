import React from 'react';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';

class AdminComponent extends React.Component {
    constructor() {
        super();        
    }

    render() {

        const navInstance = (            
            <Navbar>                
                 <NavBrand>
                     Judge Now
                 </NavBrand>                
                <Nav>
                    <NavItem eventKey={1} href="/admin/">See Results</NavItem>
                    <NavItem eventKey={3} href="/admin/send/link">Send Links to Judges</NavItem>
                    <NavItem eventKey={2} href="/admin/send/results">Send Results To Anyone</NavItem>                    
                    <NavItem eventKey={4} href="/admin/delete">Delete Results</NavItem>
                </Nav>
            </Navbar>        
        );

        return (
            <div>
                {navInstance}
                {this.props.children}
            </div>
        );
    }
}
 
export default AdminComponent;