import React from 'react'
import {Application} from "./ApplicationsPage"

interface ApplicationListProps{
    applications: Application[]
    onSelect: (app: Application) => void
}



// WIP 
const ApplicationList = (props: ApplicationListProps) => {
    return (
        <ul className = "application-list">{
               props.applications.map(app => {
            return <li key = {app._id} className ="application-list-item" onClick = {() => {props.onSelect(app)}}>
                <span className="application-list-item-uni-name">{app.uniName}</span>
                <span className="application-list-item-program-name">{app.programName}</span>
                <span className="application-list-item-app-open">{
                    // @ts-ignore
                    app.applicationOpenDate.substr(0,10)
                }</span>
                <span className="application-list-item-app-close">{
                // @ts-ignore
                app.applicationCloseDate.substr(0,10)
                }</span>

                </li>
        })}
        </ul>
    )
}


export default ApplicationList