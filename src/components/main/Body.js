import React, { Component } from 'react';
import Search from './Search'
import Ad from './Ad'
import data from "../content/database";
import ProductGroup from "../content/productGroup/ProductGroup";

class Main extends Component{
    render() {
        let uniqBrands = data.products.filter(function(item, pos, self) {
            let idx = -1;
            for(let i=0; i<data.products.length; i++){
                if(data.products[i]['brand'] === item['brand']){
                    idx = i;
                    break;
                }
            }
            return idx === pos;
        }).map(a => a.brand);
        return (
            <div className="main-body" style={{
                height: "100%",
                overflow: "scroll",
                position: "absolute",
                top: "60px"
            }}>
                <Search />
                <Ad />
                {
                    uniqBrands && uniqBrands.map((b) => (
                        <ProductGroup groupId={b} groupName={b} productList={data.products.filter(f => f.brand === b)} />
                    ))
                }
            </div>
        );
    }
}

export default Main;
