import React from 'react'
import { Application } from '../@types'
import { dateToDaysRemaining } from "../../utils/dateFunctions"

interface AppViewItemProps {
    app: Application
    onClick: Function;

}

const AppViewItem = (props: AppViewItemProps) => {
    const { app } = props 
    return (
        <div onClick = {() => props.onClick()} className = "app-view-item">
            <span>{app.uniName}</span>   
            <span>{app.programName}</span>   
            <span>{dateToDaysRemaining(app.applicationOpenDate)}</span>   
            <span>{dateToDaysRemaining(app.applicationCloseDate)}</span>   
        </div>
    )
}

export default AppViewItem