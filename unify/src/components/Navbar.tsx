import React from 'react'
import { Link } from "react-router-dom"
const Navbar = (props: {text?: string, pfp?: boolean}) => {
    return <div className = "navbar">
                {props.pfp && <Link to = "/profile"><button>Profile</button></Link> }
                <Link to = "/login">{props.text}</Link>
            </div>
}

export default Navbar