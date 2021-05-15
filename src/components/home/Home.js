import React, { Component } from 'react';
import Header from '../header/Header'
import Content from "../content/Content";

class Home extends Component{

    render() {
        return (
            <div className="home" style={{overflow: "hidden"}}>
                <Header />
                <Content query={this.props.match.params.query}/>
            </div>
        );
    }
}

export default Home;
