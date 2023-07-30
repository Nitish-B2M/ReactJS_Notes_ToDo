import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, } from "@fortawesome/free-solid-svg-icons";
import SidebarListComponent from "./SidebarList";
import Data from "./SidebarListData";

export default function SidebarComponent({setBody}) {

    const [toggle, setToggle] = React.useState(false);
    function toggleButton() {
        setToggle(!toggle);
        document.body.classList.toggle("white-mode");
        
        const sidebarLinks = document.querySelectorAll(".sidebar__links");
        sidebarLinks.forEach((link) => {
            link.classList.toggle("white-mode");
        });
    }

    const [listItem, setListItem] = React.useState(Data);

    function ActiveLink(id) {
        setListItem(prev =>  prev.map((item) => {
            return item.id === id ? {...item, isActive: true} : {...item, isActive: false};
        }));
    }

    setBody(listItem);

    const DataItem = listItem.map((item) => {
        return <SidebarListComponent 
                    key={item.id} 
                    icon={`fa fa-${item.icon} fa-light`} 
                    name={item.name} 
                    link={item.link}
                    isActive={item.isActive ? "active" : ""}
                    id={item.id}
                    onClick={ActiveLink}
                />;
    });
  
  return (
    <div className="container-fluid sidebar light">
        <div className="navbar-sidebar">
            <a className="navbar-brand" href="/">Keep Me Up</a>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
        </div>

        <div className="row">
            <div className="sidebar_menu">
            {DataItem}
            <div className="toggle_mode__icon" onClick={toggleButton}>
                {toggle ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            </div>
        </div>

      </div>
    </div>
  );
}
