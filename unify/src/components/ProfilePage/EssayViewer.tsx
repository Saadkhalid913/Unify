import React  from 'react'
import { essay } from '../@types'
import { Link } from "react-router-dom"
import {AiOutlineCloseCircle} from "react-icons/ai"

interface EssayViewerProps {
    essay: essay;
    onClose: () => void
}

const EssayViewer = (props: EssayViewerProps) => {

    return <div className = "essay-viewer">
                <button onClick = {props.onClose}>< AiOutlineCloseCircle/></button>
                <h2>{props.essay.title}</h2>
                <pre>{props.essay.body}</pre>
                {props.essay.targetSchool && <h4>Target School: {props.essay.targetSchool}</h4>}
                <Link to = {"/essays/edit/" + props.essay._id}>Edit</Link>
           </div>
}

export default EssayViewer