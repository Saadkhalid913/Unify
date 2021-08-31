import React from 'react'
import { Application } from '../@types'


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
        </div>
    )
}

export default AppViewItem