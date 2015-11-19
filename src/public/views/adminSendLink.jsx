import React from 'react';
import Form from './form.jsx';
import { Panel, Input, Button } from 'react-bootstrap';
import PageSlider from 'react-page-slider';
import ReactDom from 'react-dom';
import axios from 'axios';

class Admin extends React.Component {
    constructor() {
        super();
        this.state={message:''};
        this.send=this.send.bind(this);
    }

    send(){
        var that = this;
        const name = this.refs['name'].getValue();
        const mobile = this.refs['mobile'].getValue();

        axios.post('/send/link', {
            name: name,
            number: mobile
        })
        .then(function (response) {
            console.log(response);
            that.setState({message:response.data});
        })
        .catch(function (response) {
            alert('call raymond');
        });
    }

    render() {
        var message = this.state.message;
        const panelInstance = (
            <Panel header="Sending the link">               
                <Input ref="name" type="text" placeholder="Name" />
                <Input ref="mobile" type="text" placeholder="Mobile (without +) .i.e 6593663636" />
                                  
                <Button onClick={this.send} bsStyle="primary">Send</Button>
                <hr/>
                {message}
            </Panel>
        );            
        return panelInstance;  
    }
}
 
export default Admin;