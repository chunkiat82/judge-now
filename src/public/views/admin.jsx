import React from 'react';
import Form from './form.jsx';
import { Panel, Input, Button } from 'react-bootstrap';
import PageSlider from 'react-page-slider';
import ReactDom from 'react-dom';
import axios from 'axios';

class Admin extends React.Component {
    constructor() {
        super();
        this.state={url:''};
        this.send=this.send.bind(this);
    }

    send(){
        var that = this;
        const name = this.refs['name'].getValue();
        const mobile = this.refs['mobile'].getValue();

        axios.post('/admin/send', {
            name: name,
            number: mobile
        })
        .then(function (response) {
            console.log(response);
            that.setState({url:response.data});            
        })
        .catch(function (response) {
            alert('call raymond');
        });
    }

    render() {
        var url = this.state.url;
        const panelInstance = (
            <Panel header="Sending the links">               
                <Input ref="name" type="text" placeholder="Name" />
                <Input ref="mobile" type="text" placeholder="Mobile (without +)" />                        
                                  
                <Button onClick={this.send} bsStyle="primary">Send</Button>
                <hr/>
                {url}                  
            </Panel>
        );            
        return panelInstance;  
    }
}
 
export default Admin;