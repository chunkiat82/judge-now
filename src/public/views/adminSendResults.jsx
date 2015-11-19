import React from 'react';
import Form from './form.jsx';
import { Panel, Input, Button } from 'react-bootstrap';
import PageSlider from 'react-page-slider';
import ReactDom from 'react-dom';
import axios from 'axios';

class AdminSendResults extends React.Component {
    constructor() {
        super();        
        this.state={message:''};
        this.send=this.send.bind(this);
    }

    send(){            
        const mobile = this.refs['mobile'].getValue();
        var that = this;
        axios.post('/send/total', {            
            number: mobile
        })
        .then(function (response) {
            console.log(response); 
            try{ 
                that.setState({message:JSON.stringify(response.data,null,2)});
            }catch(e){
                console.log(e)
            }  
        })
        .catch(function (response) {
            alert('contact raymond' + JSON.stringify(response));
        });
    }

    render() {    
        var message = this.state.message;    
        const panelInstance = (
            <div>
                <Panel header="Sending Results">                
                    <Input ref="mobile" type="text" placeholder="Mobile (without +) .i.e 6593663636" />
                    <Button onClick={this.send} bsStyle="primary">Send</Button>                
                </Panel>
                <div>
                    <pre><code className="json">{message}</code></pre>                
                </div>
            </div>
        );
        return panelInstance;  
    }
}
 
export default AdminSendResults;