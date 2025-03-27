import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/*<a className="navbar-brand" href="#">MyApp</a>*/}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aktuelles">Aktuelle Frage/Antwort</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Bi2T">Biologie in 2 Tagen</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/HGi2T">Humangenetik in 2 Tagen</Link>
          </li>
          <li className="nav-item">
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




