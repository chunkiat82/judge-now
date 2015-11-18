import React from 'react';
import Form from './form.jsx';
import { Grid, Row, Col, ProgressBar, Tabs, Tab} from 'react-bootstrap';
import PageSlider from 'react-page-slider';

class TabPanel extends React.Component {
    constructor() {
        super();
        this.state={active:1, showSlider:false};
        this.next=this.next.bind(this);
        this.handleSelect=this.handleSelect.bind(this);        
    }
    next(cb){
        let active = (this.state.active) % 4 + 1;
        console.log(active);

        this.setState({showSlider:true});
        setTimeout((()=> {
            this.setState({showSlider:false,active:active});
            cb();
        }),2000);        
    }

    

    handleSelect(active) {
        this.setState({active});
    }

    render() {
        const judgeId = this.props.params.judgeId;
        const data = this.props.data;
        const results = data[judgeId] || {}; 

        const centerText = {
            textAlign:'center'
        }        

        const tabsInstance = (
            <div>
                <Tabs activeKey={this.state.active} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Talent 1"><Form data={results["Beat Singers"]} next={this.next} judge={judgeId} team="Beat Singers"/></Tab>
                    <Tab eventKey={2} title="Talent 2"><Form data={results["Black Angle"]} next={this.next} judge={judgeId} team="Black Angle"/></Tab>
                    <Tab eventKey={3} title="Talent 3"><Form data={results["Dis Band"]} next={this.next} judge={judgeId} team="Dis Band"/></Tab>
                    <Tab eventKey={4} title="Talent 4"><Form data={results["K's Angel"]} next={this.next} judge={judgeId} team="K's Angel"/></Tab>
                </Tabs>
                <PageSlider show={this.state.showSlider}>
                    <div style={centerText}>
                        <h1>Received</h1>
                        <br/>
                        <h1>Next...</h1>
                    </div>
                </PageSlider>
            </div>
        );            
        return tabsInstance;  
    }
}
 
export default TabPanel;