import React from 'react'

import { Application  } from "./ApplicationsPage"

interface ApplicationViewerProps {
    onDelete: (app: Application) => void;
    app: Application | undefined;
    onScreen: boolean
}

const ApplicationViewer = (props: ApplicationViewerProps) => {
    if (!props.app) return <div></div>

    const { app, onDelete, onScreen } = props
    const screenState = (onScreen) ? "app-view-wrapper-onscreen" : "app-view-wrapper"
    return (
        
        <div className = {screenState}>
            <div className = "app-view">
                <h2>University Name: {app.uniName}</h2>
                <h2>Program Name: {app.programName}</h2>
                <div> 
                    <div>
                        <span>Application Opens</span>
                        <span>Application Closes</span>
                        <span>Expected Response Date</span>
                    </div>
                    <div>
                        <span>{app.applicationOpenDate}</span>
                        <span>{app.applicationCloseDate}</span>
                        <span>{app.expectedResponseDate}</span>
                    </div>
                </div>
            </div>
            <button className = "app-view-delete" onClick = {() => {onDelete(app)}}>Delete</button>
        </div>
    )
}

export default ApplicationViewer