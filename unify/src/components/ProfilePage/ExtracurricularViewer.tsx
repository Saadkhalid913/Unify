import React from 'react'
import {Extracurricular} from "../HomePage/ApplicationsPage"

interface ExtracurricularViewerProps {
    extracurriculars: Extracurricular[];
    addNew: () => void;
}

const ExtracurricularViewer = (props: ExtracurricularViewerProps) => {
    return (
        <div className = "profile-ec-wrapper">
            <h3>Your Extracurriculars</h3>
            <ul className = "profile-ec-list">
                {props.extracurriculars.map(ec => {
                return <li className = "profile-ec-list-item" key = {ec._id} >{ec.name}</li>
                })}
            </ul>
            <button onClick = {() => props.addNew()}>Add New +</button>
        </div>
    )
}

export default ExtracurricularViewer