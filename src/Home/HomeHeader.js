import React from "react";
import "./HomeHeader.css";
import logo from '../cAMP.svg';

export default function HomeHeader () {
    return (
<div className="HomeHeader">
        <img src={logo} className="App-logo img-fluid" alt="logo" />
        </div>
    )
}