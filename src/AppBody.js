import React from "react";
import "./AppBody.css";



export default function AppBody () {
    return (
<div className="AppBody">
        <div className="h2"><h2>Aktuelles</h2></div>
        <div className="h3"><h3 className="blue">Biologie in 2. Tagen - <span className="red">11. Auflage</span> ist jetzt lieferbar.</h3></div>
        <div className="row">
            <div className="col-6">
<button className="btn">Frage des Tages</button>
            </div>
            <div className="col-6">
            <button className="btn">info@camp-books.com</button>  
            </div>
        </div>
</div>

    )
}