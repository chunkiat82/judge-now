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

        axios.post('/data/delete', {
            name: name
        })
        .then(function (response) {
            console.log(response);
            that.setState({message:"deleted"});            
        })
        .catch(function (response) {
            alert('call raymond');
        });
    }

    render() {
        var message = this.state.message;
        const panelInstance = (
            <Panel header="Deleting Data">               
                <Input ref="name" type="text" placeholder="Name" />
                                  
                <Button onClick={this.send} bsStyle="primary">Delete</Button>
                <hr/>
                {message}                  
            </Panel>
        );            
        return panelInstance;  
    }
}
 
export default Admin;