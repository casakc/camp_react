import React from "react";
import "./AppHeader.css";
import logo from './Zettel, Logo1.jpg';

export default function AppHeader () {
    return (
<div className="AppHeader">
        <img src={logo} className="App-logo img-fluid" alt="logo" />
        </div>
    )
}