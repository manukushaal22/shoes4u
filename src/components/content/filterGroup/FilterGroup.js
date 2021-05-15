import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl'
import '../content.css'

class FilterGroup extends Component{

    constructor(props) {
        super(props);
        let data = props.dataSource.products;
        let filters = props.dataSource.filters;
        let stateData = {}
        for (const fil of filters) {
            for (const obj of data) {
                stateData = {
                    ...stateData,
                    [fil.name]: {
                        ...stateData[fil.name],
                        [obj[fil.name]]: true
                    }
                }
            }
        }
        this.state = stateData
    }


    componentDidMount() {
        this.props.displayTrigger(this.state, null);
    }

    clickAll = (filterName) => {
        let newState = this.state;
        for(const i in this.state[filterName]) {
            let attrName = i;
            let attrChecked = !this.state[filterName][i];
            newState = {
                ...newState,
                [filterName]: {
                    ...newState[filterName],
                    [attrName]: attrChecked
                },
            }
        }
        this.setState(newState)
        this.props.displayTrigger(newState, null);
    }

    render() {
        const classes = makeStyles();
        const handleChange = (event, filterName) => {
            let attrName = event.target.name;
            let attrChecked = event.target.checked;
            let newState = {
                ...this.state,
                [filterName]: {
                    ...this.state[filterName],
                    [attrName]: attrChecked
                },
            }
            this.setState(newState)
            this.props.displayTrigger(newState, null);
        }

        let data = this.props.dataSource.products;
        let filters = this.props.dataSource.filters;
        return (
            <div className="filterGroup">
                {
                    filters && filters.map((fil) => {
                        let uniq = data.filter(function(item, pos, self) {
                            let idx = -1;
                            for(let i=0; i<data.length; i++){
                                if(data[i][fil.name] === item[fil.name]){
                                    idx = i;
                                    break;
                                }
                            }
                            return idx === pos;
                        })
                        return (
                        <div className={"filterBox"}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <button style={{width: "100%", border: "1px solid grey", cursor: "pointer"}}  onClick={() => this.clickAll(fil.name)}><FormLabel component="legend"><b style={{textTransform:"capitalize", userSelect: "none", color: "purple"}}>{fil.name}</b></FormLabel></button>
                                <FormGroup row>
                                    {
                                        data && uniq.map((obj) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state[fil.name] !== undefined ? (this.state[fil.name][obj[fil.name]] !== undefined ? this.state[fil.name][obj[fil.name]] : true) : true}
                                                        onChange={(event) => handleChange(event, fil.name)}
                                                        name={obj[fil.name]}
                                                        color="primary"
                                                    />
                                                }
                                                label={obj[fil.name]}
                                            />))
                                    }
                                </FormGroup>
                            </FormControl>
                        </div>
                    )})
                }
            </div>
        );
    }
}
//this.state[fil.name] ? (this.state[fil.name][obj[fil.name]] ? this.state[fil.name][obj[fil.name]] : true) : true
export default FilterGroup;
