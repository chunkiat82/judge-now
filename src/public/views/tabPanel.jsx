import React from 'react';
import Form from './form.jsx';
import { Grid, Row, Col, ProgressBar, Tabs, Tab} from 'react-bootstrap';
import PageSlider from 'react-page-slider';
import ReactDom from 'react-dom';
import Header from './header.jsx';

const teams = ['Acapalians', 'Black Angle', 'Dis Band', '9th Heaven' ];

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
        var that = this;
        const judgeId = that.props.params.judgeId;
        const data = that.props.data;
        const results = data[judgeId] || {}; 

        const centerText = {
            textAlign:'center'
        }


        const tabsInstance = (
            <div>
                <Header judgeId={that.props.params.judgeId}/>
                <Tabs activeKey={that.state.active} onSelect={that.handleSelect}>
                    {teams.map(function(object, i){
                        return <Tab key={`key${i+1}`} eventKey={i+1} title={`Talent ${i+1}`}><Form data={results[teams[i]]} next={that.next} judge={judgeId} team={teams[i]}/></Tab>;
                    })}                    
                </Tabs>
                <PageSlider show={that.state.showSlider}>
                    <div style={centerText}>
                        <h1>Received</h1>
                        <br/>
                        <h1>Next...</h1>
                        <br/>
                        <h1 style={{color:'red'}}>{that.state.current}</h1>
                    </div>
                </PageSlider>
            </div>
        );            
        return tabsInstance;  
    }
}
 
export default TabPanel;