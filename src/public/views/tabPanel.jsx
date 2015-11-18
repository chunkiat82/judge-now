import React from 'react';
import Form from './form.jsx';
import { Grid, Row, Col, ProgressBar, Tabs, Tab} from 'react-bootstrap';
import PageSlider from 'react-page-slider';
import ReactDom from 'react-dom';
import Header from './header.jsx';
const teams = ['Beat Singers', 'Black Angle', 'Dis Band', 'K\'s Angel' ];

class TabPanel extends React.Component {
    constructor() {
        super();
        this.state={active:1, showSlider:false, current: "" };
        this.next=this.next.bind(this);
        this.handleSelect=this.handleSelect.bind(this);        
    }
    next(cb){
        
        let current = "Done!";

        let active = (this.state.active) % 4 + 1;
        if (active >= this.state.active){
            current = teams[active-1];
        }

        this.setState({showSlider:true, current:current});
        setTimeout((()=> {
            this.setState({active:active});
            setTimeout((()=> {
                this.setState({showSlider:false});
                cb();
            }),2000);
        }),1100);
        
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.state.active!=prevState.active){
            ReactDom.findDOMNode(this).scrollIntoView();        
        }
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
                <Header judgeId={this.props.params.judgeId}/>
                <Tabs activeKey={this.state.active} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Talent 1"><Form data={results[teams[0]]} next={this.next} judge={judgeId} team={teams[0]}/></Tab>
                    <Tab eventKey={2} title="Talent 2"><Form data={results[teams[1]]} next={this.next} judge={judgeId} team={teams[1]}/></Tab>
                    <Tab eventKey={3} title="Talent 3"><Form data={results[teams[2]]} next={this.next} judge={judgeId} team={teams[2]}/></Tab>
                    <Tab eventKey={4} title="Talent 4"><Form data={results[teams[3]]} next={this.next} judge={judgeId} team={teams[3]}/></Tab>
                </Tabs>
                <PageSlider show={this.state.showSlider}>
                    <div style={centerText}>
                        <h1>Received</h1>
                        <br/>
                        <h1>Next...</h1>
                        <br/>
                        <h1 style={{color:'red'}}>{this.state.current}</h1>
                    </div>
                </PageSlider>
            </div>
        );            
        return tabsInstance;  
    }
}
 
export default TabPanel;