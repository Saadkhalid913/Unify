import React, { useContext }  from 'react'
import { essay } from '../@types'
import { Link } from "react-router-dom"
import {AiOutlineCloseCircle} from "react-icons/ai"
import tokenContext from '../../contexts/tokenContext'
import axios from 'axios'

const ROOT_URL = process.env.REACT_APP_root_url

interface EssayViewerProps {
    essay: essay;
    onClose: () => void;
    onDelete: (id: string) => void
}

const EssayViewer = (props: EssayViewerProps) => {
    const {token} = useContext(tokenContext)
    return <div className = "essay-viewer">
                <button onClick = {props.onClose}>< AiOutlineCloseCircle/></button>
                <h2>{props.essay.title}</h2>
                <pre>{props.essay.body}</pre>
                {props.essay.targetSchool && <h4>Target School: {props.essay.targetSchool}</h4>}
                <Link to = {"/essays/edit/" + props.essay._id}>Edit</Link>
                <button className = "essay-delete" onClick = { async () => {
                    await axios.delete(ROOT_URL + "/essays/" + props.essay._id, {headers: {user_auth_token: token}})
                    props.onDelete(props.essay._id)
                    props.onClose()
                }}>Delete</button>
           </div>
}


export default EssayViewer