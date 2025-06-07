import React from "react";
import { Link } from 'react-router-dom';
import "./HomeBody.css";



export default function HomeBody () {
    return (
<div className="HomeBody">
        <div className="h2"><h2>Aktuelles</h2></div>
        <div className="h3"><h3 className="blue">Biologie in 2. Tagen - <span className="red">11. Auflage</span> ist jetzt lieferbar.</h3></div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
          <div className="btn">
        <Link to="/kontakt">info@camp-books.com</Link>
     </div>
     </div>
          <div className="col-3"></div>
        </div>
</div>
    )
}