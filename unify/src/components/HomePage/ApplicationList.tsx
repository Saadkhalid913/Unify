import React from 'react'
import {Application} from "./ApplicationsPage"

interface ApplicationListProps{
    applications: Application[]
}



// WIP 
const ApplicationList = (props: ApplicationListProps) => {
    console.log(props.applications)
    return (
        <ul className = "application-list">{
               props.applications.map(app => {
            return <li key = {app._id} className ="application-list-item">{app.uniName}</li>
        })}
        </ul>
    )
}


export default ApplicationList