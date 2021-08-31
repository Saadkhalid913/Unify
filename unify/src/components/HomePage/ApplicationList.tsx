import React from 'react'
import {Application} from "./ApplicationsPage"

interface ApplicationListProps{
    applications: Application[]
}



// WIP 
const ApplicationList = (props: ApplicationListProps) => {
    return (
        <ul className = "application-list">{
               props.applications.map(app => {
            return <li key = {app._id} className ="application-list-item">
                <div className="application-list-item-uni-name">{app.uniName}</div>
                <div className="application-list-item-program-name">{app.programName}</div>
                <div className="application-list-item-app-open">{
                    // @ts-ignore
                    app.applicationOpenDate.substr(0,10)
                }</div>
                <div className="application-list-item-app-close">{
                // @ts-ignore
                app.applicationCloseDate.substr(0,10)
                }</div>

                </li>
        })}
        </ul>
    )
}


export default ApplicationList