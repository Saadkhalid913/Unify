import React from 'react'
import {Extracurricular} from "../HomePage/ApplicationsPage"

interface ExtracurricularViewerProps {
    extracurriculars: Extracurricular[];
}

const ExtracurricularViewer = (props: ExtracurricularViewerProps) => {
    return (
        <div className = "profile-ec-wrapper">
            <h3>Your Extracurriculars</h3>
            <ul className = "profile-ec-list">
                {props.extracurriculars.map(e => {
                return <li className = "profile-ec-list-item" key = {e._id} > {e.name}</li>
                })}
            </ul>
        </div>
    )
}

export default ExtracurricularViewer