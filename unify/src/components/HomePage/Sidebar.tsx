import React from 'react'

interface SidebarProps {
    showAppBox: () => void
}

const Sidebar = (props: SidebarProps) => {
    return (
        <div className="sidebar-wrapper">
            <button onClick = {props.showAppBox}>Add Application</button>
            <ul className="sidebar-list">
                <li>Blah</li>
                <li>Blah</li>
                <li>Blah</li>
                <li>Blah</li>
            </ul>
        </div>
    )
}

export default Sidebar