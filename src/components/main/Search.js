import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

class Main extends Component{
    search = () => {
        console.log('adfadf')
        let x = document.getElementById("searchBar").value;
        if(x.length > 0)
            window.location.href = "search/"+x
    }
    render() {
        const classes = makeStyles();
        return (
            <div className="main-search" style={{margin: 20}}>
                <TextField id="searchBar" label="Search" variant="outlined" style={{width:500}}/>
                <button onClick={this.search} style={{
                    height: 54,
                    width: 100,
                    backgroundColor: "black",
                    border: 0,
                    color: "white",
                    fontSize: 20
                }}>Search</button>
            </div>
        );
    }
}

export default Main;