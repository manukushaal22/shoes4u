import React, { Component } from 'react';
import './header.css'

class Header extends Component{

    render() {
        return (
            <div className="header">
                <nav className="header-nav">
                    <div className={"header-nav-item"}>
                        <img src="shoe.png" onClick="window.location.href='index.html'"  alt={"shoe_logo"}/>
                    </div>
                    <div className={"header-nav-item"}>
                        <p>SHOES4U</p>
                    </div>
                    <div className={"header-nav-item"}>
                        <button className="header-nav-login" href={"#"}>Login</button>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
