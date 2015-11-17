import React from 'react';
import Form from './form.jsx';
import { Grid, Row, Col, ProgressBar, Tabs, Tab} from 'react-bootstrap';
// import PageSlider from 'react-page-slider';

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
        }),1000);        
    }

    

    handleSelect(active) {
        this.setState({active});
    }

     // <PageSlider show={this.state.showSlider}>
     //                <h1>Received</h1>
     //            </PageSlider>

    render() {
        const judgeName = this.props.params.judgeId;
        
        const tabsInstance = (
            <div>
                <Tabs activeKey={this.state.active} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Talent 1"><Form next={this.next} judge={judgeName} team="Beat Singers"/></Tab>
                    <Tab eventKey={2} title="Talent 2"><Form next={this.next} judge={judgeName} team="Black Angle"/></Tab>
                    <Tab eventKey={3} title="Talent 3"><Form next={this.next} judge={judgeName} team="Dis Band"/></Tab>
                    <Tab eventKey={4} title="Talent 4"><Form next={this.next} judge={judgeName} team="K's Angel"/></Tab>
                </Tabs>
               
            </div>
        );            
        return tabsInstance;  
    }
}
 
export default TabPanel;