import React from 'react'
import { essay } from '../@types'
import { Link } from "react-router-dom"


interface EssayViewerProps {
    essay: essay;
    onClose: () => void
}

const EssayViewer = (props: EssayViewerProps) => {
    return <div className = "essay-viewer">
                <button onClick = {props.onClose}>X</button>
                <h2>{props.essay.title}</h2>
                <p>{props.essay.body}</p>
                {props.essay.targetSchool || <h4>{props.essay.targetSchool}</h4>}
                <Link to = {"/essays/" + props.essay._id}>Edit</Link>
           </div>
}

export default EssayViewer