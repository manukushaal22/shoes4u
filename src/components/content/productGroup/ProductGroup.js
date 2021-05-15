import '../content.css';
import React from 'react';
import ProductBox from "../productBox/ProductBox";

class ProductGroup extends React.Component{

    render() {
        return (
            <div className="productGroup">
                <h1 id={this.props.groupId} style={{fontWeight: "bolder", textAlign: "center", fontSize: 40}}>{this.props.groupName}</h1>
                <div className="flex-container3">
                    {
                        this.props.productList.map((i) => (
                            <ProductBox prodProps={i}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ProductGroup;