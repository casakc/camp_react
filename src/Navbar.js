import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/*<a className="navbar-brand" href="#">MyApp</a>*/}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
          </li>
          <li className={`nav-item ${location.pathname === "/Aktuelles" ? "active" : ""}`}>
            <Link className="nav-link" to="/Aktuelles">Aktuelle Frage/Antwort</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/Bi2T" ? "active" : ""}`}>
            <Link className="nav-link" to="/Bi2T">Biologie in 2 Tagen</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/HGi2T" ? "active" : ""}`}>
            <Link className="nav-link" to="/HGi2T">Humangenetik in 2 Tagen</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/Kontakt" ? "active" : ""}`}>
            <Link className="nav-link" to="/Kontakt">Kontakt</Link>
          </li>
          {/*<li className="nav-item">
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>*/}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;




