import React from "react";
import "./Navbar.scss";
// import icons for dark mode and light mode
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavbarComponent() {
   return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/">User</a>
                        <a className="nav-link" href="/">Logout</a>
                        <FontAwesomeIcon icon="sun" className="nav-link" />
                    </div>
                </div>
            </nav>
        </div>
   );
}
