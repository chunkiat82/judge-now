import React from 'react';

export default class Header extends React.Component {

    constructor() {
        super();     
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <h1><a className="navbar-brand" href="#">#PayPal 2015 Dinner and Dance</a></h1>
                    </div>
                    <div>
                        <h1><a href="#">JudgeId: {this.props.judgeId}</a></h1>
                    </div>
                </div>
            </nav>
        );
    }
};
