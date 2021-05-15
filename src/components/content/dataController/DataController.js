import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FilterGroup from "../filterGroup/FilterGroup";

class DataController extends Component{

    constructor(props) {
        super(props);
        let maxCost = 0;
        for(const obj of this.props.dataSource.products){
            maxCost = obj.cost>maxCost ? obj.cost : maxCost
        }
        console.log(maxCost)
        this.state = {
            priceRange: [0, maxCost],
            maxCost: maxCost
        }
    }

    componentDidMount() {
        this.props.displayTrigger(null,this.state.priceRange)
    }

    render() {
        const handleChange = (event, newValue) => {
            let newState = {
                priceRange: newValue
            }
            this.setState(newState);
            this.props.displayTrigger(null,newState.priceRange)
        }
        const valuetext = (val) => {
            return val;
        }
        const filterPrice = (event, val) => {
            console.log(val);
        }
        return (
            <div className="controller">
                <h1 style={{fontWeight: "bolder", textAlign: "left", fontSize: 40, margin: 0, padding: "5%", borderBottom: "1px solid darkgrey", top: 0}}>Filters</h1>
                <div className={"filterBox"}>
                    <Typography id="range-slider" gutterBottom>
                        <b>Price Range</b>
                    </Typography>
                    <Slider
                        value={this.state.priceRange}
                        onChange={handleChange}
                        onChangeCommitted={filterPrice}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={0}
                        max={this.state.maxCost}
                    />
                </div>
                <div className={"all-filters"}>
                    <FilterGroup dataSource={this.props.dataSource} displayTrigger={this.props.displayTrigger}/>
                </div>
            </div>
        );
    }
}

export default DataController;
