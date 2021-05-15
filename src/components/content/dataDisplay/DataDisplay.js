import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ProductGroup from "../productGroup/ProductGroup";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import data from "../database";

class DataDisplay extends Component{
    constructor(props) {
        super(props);
        let query = props.query !== undefined && props.query !== null
        this.state = {
            prods: null,
            sortBy: null,
            query: query,
            sortOrder: "asc"
        };
    }

    componentDidMount() {
        if(this.state.query){
            this.search(this.props.query);
        }
    }

    sortLogic = (a,b) => {
        let t = typeof a[this.state.sortBy];
        let res;
        if(t==="number") {
            if(a[this.state.sortBy] < b[this.state.sortBy])
                res = -1;
            else if(a[this.state.sortBy] > b[this.state.sortBy])
                res =  1;
            else
                res = 0;
        } else {
            res = a[this.state.sortBy].toString().localeCompare(b[this.state.sortBy].toString())
        }
        if(res === 0) return res;
        return this.state.sortOrder === "asc" ? res : -res;
    }

    filteredProducts = () => {
        let prods = this.props.dataSource.prodData.products;
        if(this.state.sortBy)
            prods = prods.sort(this.sortLogic)
        let filters = this.props.dataSource.filtersApplied;
        let minCost = this.props.dataSource.priceRange !== undefined ? this.props.dataSource.priceRange[0] : 0
        let maxCost = this.props.dataSource.priceRange !== undefined ? this.props.dataSource.priceRange[1] : 1000
        let filCost = prods.filter((prod) => prod.cost>=minCost && prod.cost<=maxCost);
        if(filters === undefined || filters === null) return filCost;
        return filCost.filter((prod) => {
            for (const filterKey in filters) {
                let filter = filters[filterKey];
                for (const prodKey in prod) {
                    let prodVal = prod[prodKey];
                    if (filterKey === prodKey && filter[prodVal] && filter[prodVal] === true) return true
                }
            }
            return false;
        })
    }
    search = (val) => {
        let prods = data.products
        document.getElementById("searchBar").value = val;
        if(val.length<1) {
            this.setState({
                prods: null,
                query: false
            })
            return prods;
        }
        let final = prods.filter((prod) => {
            for(const search of data.searchCriteria){
                if(prod[search.name].toString().toLowerCase().includes(val.toString().toLowerCase())) return true;
            }
            return false;
        })
        this.setState({
            prods: final,
            query: false
        })
        return final;
    }

    sortData = (event) => {
        let x = event.target.value === "" ? null : event.target.value;
        this.setState({
            sortBy: x,
            prods: null
        })
    }

    sortOrderChange = (event) => {
        let x = event.target.value;
        this.setState({
            prods: null,
            sortOrder: x
        })
    }
    render() {
        const classes = makeStyles();
        return (
            <div className="display">
                <div className={"respp"} style={{display: "flex", flexBasis:"auto"}}>
                    <form className={classes.root} noValidate autoComplete="off" style={{flexGrow:1}}>
                        <TextField id="searchBar" label="Search" variant="outlined" onInput={(event) => this.search(event.target.value)} style={{width:500}} />
                    </form>
                    <FormControl variant="outlined" className={classes.formControl} style={{flexGrow:1,maxWidth:150, paddingRight:50,marginLeft:50}}>
                        <InputLabel id="demo-simple-select-outlined-label">SortBy</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.sortBy}
                            onChange={this.sortData}
                            label="SortBy"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                data.sorter && data.sorter.map((i) =>
                                    <MenuItem value={i.name} style={{textTransform:"capitalize"}}>{i.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl} style={{flexGrow:1,maxWidth:150, paddingRight:50,marginLeft:50}}>
                        <InputLabel id="demo-simple-select-outlined-label">SortOrder</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.sortOrder}
                            onChange={this.sortOrderChange}
                            label="SortOrder"
                        >
                            <MenuItem value="asc">
                                <em>Ascending</em>
                            </MenuItem>
                            <MenuItem value="des">
                                <em>Descending</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <ProductGroup groupId={"products"} groupName={"Products"} productList={this.state.prods || this.filteredProducts()} />
            </div>
        );
    }
}

export default DataDisplay;
