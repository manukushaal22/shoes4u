import React, { Component } from 'react';
import Header from '../header/Header'
import Content from "../content/Content";

class Home extends Component{

    render() {
        return (
            <div className="home">
                <Header />
                <Content />
            </div>
        );
    }
}

export default Home;
