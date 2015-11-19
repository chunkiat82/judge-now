import Layout from './layout.jsx';
import Header from './header.jsx';
import React from 'react';
import {Router} from 'react-router' ;

import configureStore from '../../store/configureStore' ;
import { Provider } from 'react-redux';
const store = configureStore();

export default class App extends React.Component {
	render() {
      
        return (    
            <Provider store={store}>            
                <Layout {...this.props} />                
            </Provider>                
        )      
	}
}