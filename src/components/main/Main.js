import React, { Component } from 'react';
import Header from '../header/Header'
import Body from './Body'

class Main extends Component{

    render() {
        return (
            <div className="main-main" style={{
            }}>
                <Header />
                <Body />
            </div>
        );
    }
}

export default Main;
