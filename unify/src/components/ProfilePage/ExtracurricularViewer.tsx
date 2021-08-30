import React from 'react'
import {Extracurricular} from "../HomePage/ApplicationsPage"

interface ExtracurricularViewerProps {
    extracurriculars: Extracurricular[];
}

const ExtracurricularViewer = (props: ExtracurricularViewerProps) => {
    return (
        <ul className = "profile-ec-list">
            {props.extracurriculars.map(e => {
                return <li key = {e._id} > {e.name}</li>
            })}
        </ul>
    )
}

export default ExtracurricularViewer