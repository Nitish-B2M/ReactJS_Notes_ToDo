import React from "react";


export default function SidebarListComponent(props) {

    return(
        <div className="sidebar__links">
            <div onClick={() => props.onClick(props.id)} 
            className={props.isActive}>

                <i className={props.icon} aria-hidden="true"/> 
                &nbsp; {props.name}
            </div>
        </div>
    );
}