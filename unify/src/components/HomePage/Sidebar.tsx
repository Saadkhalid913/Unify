import React from 'react'
import { Link  } from "react-router-dom"
interface SidebarProps {
    showAppBox: () => void
}

const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar-wrapper">
            <button onClick = {props.showAppBox}>Add Application</button>
            <ul className="sidebar-list">
                <Link to = "me">My Profile</Link>
                <li>Blah</li>
                <li>Blah</li>
                <li>Blah</li>
            </ul>
        </div>
    )
}

export default Sidebar