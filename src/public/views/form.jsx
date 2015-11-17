import React from 'react';
import { Panel, Button, Jumbotron} from 'react-bootstrap';
import Criterion from './criterion.jsx';

var levelup = require('levelup')
 
// 1) Create our database, supply location and options. 
//    This will create or open the underlying LevelDB store. 
var db = levelup('./mydb')
 
// 2) put a key & value 
db.put('name', 'LevelUP', function (err) {
  if (err) return console.log('Ooops!', err) // some kind of I/O error 
 
  // 3) fetch by key 
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found 
 
    // ta da! 
    console.log('name=' + value)
  })
})

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
        this.state.criteria.forEach(function(criterion){
            const points = criterion.state.points;
            const title = criterion.props.title;
            zeroFound = zeroFound || points === 0;
            entries.push({title:title,points:points});
        });
        
        if (zeroFound){
            alert('you have not judged in one of more categories');
        }else{            
            this.props.next((err,data)=>{
                this.setState({entries:entries, completed:zeroFound === false});
                persist('raymondho',entries);
            });
        }
    }

    persist(judge,entries){
        
    }

    renderPanel(){
        const jStyle={
            textAlign:'center'            
        }
        const defaultOutput = (
            <div>
                <Panel>
                    <Jumbotron style={jStyle}><h1>{this.props.team}</h1></Jumbotron>
                    <Criterion title="Audience Response" ref={(c) => this.state.criteria[0]= c}/>
                    <Criterion title="Stage Appearance and Presence" ref={(c) => this.state.criteria[1]= c}/>
                    <Criterion title="Originality" ref={(c) => this.state.criteria[2]= c}/>
                    <Criterion title="Personality" ref={(c) => this.state.criteria[3]= c}/>
                    <Criterion title="Creativity" ref={(c) => this.state.criteria[4]= c}/>
                    <Criterion title="Organization/Coordination" ref={(c) => this.state.criteria[5]= c}/>
                    <Criterion title="Overall Performance" ref={(c) => this.state.criteria[6]= c}/>
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

        return this.state.completed ? completedOutput : defaultOutput ;
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