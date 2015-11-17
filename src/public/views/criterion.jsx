import React from 'react';
import { Panel, Button, Label} from 'react-bootstrap';

class Criterion extends React.Component {
    constructor() {
        super();
        this.state= { points: 0 }
        this.setPoints=this.setPoints.bind(this);
    }

    setPoints(points){
        this.setState({points:points});        
    }

    renderButtons(){
        if (this.state.points===0){             
            return (<div>
                <Button bsSize="large" bsStyle="danger" onClick={(()=>this.setPoints(10))}>Poor-10</Button>&nbsp;&nbsp;&nbsp;
                <Button bsSize="large" bsStyle="warning" onClick={(()=>this.setPoints(20))}>Fair-20</Button>&nbsp;&nbsp;&nbsp;
                <Button bsSize="large" bsStyle="success" onClick={(()=>this.setPoints(30))}>Good-30</Button>&nbsp;&nbsp;&nbsp;
                <Button bsSize="large" bsStyle="primary" onClick={(()=>this.setPoints(40))}>Execellent-40</Button>
            </div>);
        }else{
            return (<div>
                <Button bsSize="large" bsStyle="default" onClick={(()=>this.setPoints(0))}>Reset Score</Button>
            </div>);
        }
    }
    renderPoints(){
        let bsStyle="default";

        switch (this.state.points){
            case 10:
                bsStyle="danger";
                break;
            case 20:
                bsStyle="warning";
                break;
            case 30:
                bsStyle="success";
                break;
            case 40:
                bsStyle="primary";
                break;
            default:
                break;
        }
        return <Label bsStyle={bsStyle}>{this.state.points}</Label>;        
    }

    render() {
        const style = {
            margin: '0 auto',
            width: '100%',
            textAlign: 'center'
        }
        return (
            <div style={style}>                
                <h1>{this.renderPoints()} Points</h1>
                <h1>{this.props.title}</h1>
                <br/>{this.renderButtons()}
                <hr/>
            </div>
        );  
    }
}
 
export default Criterion;