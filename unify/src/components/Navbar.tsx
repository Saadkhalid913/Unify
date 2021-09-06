import React from 'react'
import { Link } from "react-router-dom"
const Navbar = (props: {text?: string}) => {
    return <div className = "navbar">
                <Link to = "login">{props.text}</Link>
            </div>
}

export default Navbar