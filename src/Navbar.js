import React from 'react';
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
            <a className="nav-link" href="home">Home<span className="sr-only"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="aktuelles">Aktuelles</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Bi2T">Biologie in 2 Tagen</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="HGi2T">Humangenetik in 2 Tagen</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Kontakt">Kontakt</a>
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
