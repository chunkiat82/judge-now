import React from 'react';
import { Panel, Button, Jumbotron} from 'react-bootstrap';
import Criterion from './criterion.jsx';

import axios from 'axios';

class Form extends React.Component {
    constructor() {
        super();        
        this.state={entries:[],criteria:[],completed:false};
        this.calculateTotal=this.calculateTotal.bind(this);
        this.persist=this.persist.bind(this);
    }

    calculateTotal(){
        let entries = [];
        let zeroFound = false;
        let total = 0;
        this.state.criteria.forEach(function(criterion){
            const points = criterion.state.points;
            const title = criterion.props.title;
            zeroFound = zeroFound || points === 0;
            total += points
            entries.push({title:title, points:points});
        });
        
        if (zeroFound){
            alert('you have not judged in one of more categories');
        }else{
            entries.push({title:'total', points:total});
            this.props.next((err,data)=>{
                this.setState({entries:entries, completed:zeroFound === false});
                this.persist(this.props.judge,this.props.team,entries);
            });
        }
    }

    persist(judge,team,entries){        
        axios.post('/data', {
            judge: judge,
            team: team,
            entries: entries
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    renderPanel(){
        const jStyle={ textAlign:'center' };

        const data = this.props.data;        

        const defaultOutput = (
            <div>
                <Panel>
                    <Jumbotron style={jStyle}><h1>{this.props.team}</h1></Jumbotron>
                    <Criterion data={data} title="Audience Response" ref={(c) => this.state.criteria[0]= c}/>
                    <Criterion data={data} title="Stage Appearance and Presence" ref={(c) => this.state.criteria[1]= c}/>
                    <Criterion data={data} title="Originality" ref={(c) => this.state.criteria[2]= c}/>
                    <Criterion data={data} title="Personality" ref={(c) => this.state.criteria[3]= c}/>
                    <Criterion data={data} title="Creativity" ref={(c) => this.state.criteria[4]= c}/>
                    <Criterion data={data} title="Organization/Coordination" ref={(c) => this.state.criteria[5]= c}/>
                    <Criterion data={data} title="Overall Performance" ref={(c) => this.state.criteria[6]= c}/>
                    <h1 style={jStyle}>Once submitted, no changes allowed.</h1>
                    <Button bsSize="large" bsStyle="primary" onClick={this.calculateTotal} block>Submit</Button>                    
                </Panel>                
            </div>
        );

        const completedOutput = (
            <Panel>
                <Jumbotron style={jStyle}><h1>{this.props.team} - Submited</h1></Jumbotron>                
            </Panel>
        )

        return this.state.completed || data ? completedOutput : defaultOutput ;
    }

    render() {              
        return (
            <div>
                {this.renderPanel()}
            </div>
        );  
    }
}
 
export default Form;