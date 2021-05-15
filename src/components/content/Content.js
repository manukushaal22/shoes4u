import React, { Component } from 'react';
import DataController from "./dataController/DataController";
import DataDisplay from "./dataDisplay/DataDisplay";
import './database'
import data from "./database";

class Content extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: {
                prodData: data,
            }
        }
    }

    updateDisplay = (filters, priceRange) => {
        if(!filters)
            this.setState({
                dataSource: {
                    ...this.state.dataSource,
                    priceRange: priceRange,
                }
            });
        else
            this.setState({
                dataSource: {
                    ...this.state.dataSource,
                    filtersApplied: filters,
                }
            });
    }

    render() {
        return (
            <div className="content">
                <div className="content-panel-controller">
                    <DataController  dataSource={data} displayTrigger={this.updateDisplay} />
                </div>
                <div className="content-panel-display">
                    <DataDisplay dataSource={this.state.dataSource} query={this.props.query}/>
                </div>
            </div>
        );
    }
}

export default Content;
