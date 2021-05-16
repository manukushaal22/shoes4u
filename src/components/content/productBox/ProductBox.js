import '../content.css';
import React from 'react';

class ProductBox extends React.Component{

    cartAdd = (name, price) => {
        // var cartbutton = document.getElementById('cart-value');
        let cart = JSON.parse(localStorage.getItem("usercart"));
        if(cart === null){
            cart = []
        }
        // cartbutton.innerHTML = cart.length + 1;
        cart.push({"name":name, "price":price})
        localStorage.setItem("usercart",JSON.stringify(cart))
    }

    render() {
        return (
            <div className="box1">
                <img src={"http://localhost:3000/img/"+this.props.prodProps.imgName} alt={this.props.prodProps.imgName}/>
                <p style={{fontWeight: "bold",wordSpacing: 50}}>{this.props.prodProps.name} ₹{this.props.prodProps.cost}</p>
                {
                    Object.keys(this.props.prodProps).filter((a)=> (!["cost","imgName","name", "color","gender"].includes(a))).map((a) => (
                        <p style={{textAlign: "left", paddingLeft: 20, fontSize:"90%"}}><b>{a}:</b>    {this.props.prodProps[a]}</p>
                    ))
                }
                <button className="btn1" onClick={() => this.cartAdd(this.props.prodName, this.props.prodCost)}>ADD TO CART</button>
            </div>
        );
    }
}

export default ProductBox;