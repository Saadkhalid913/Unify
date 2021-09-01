import { Application, Extracurricular } from "../@types"
import React , {useState} from 'react'
import * as joi from "joi"

interface AppCreateFormProps {
    onSubmit: (app: Application) => void
}
const AppCreateForm = (props: AppCreateFormProps) => {
    const [uniName, setUniName] = useState("")
    const [programName, setProgramName] = useState("")
    const [applicationOpenDate, setApplicationOpenDate] = useState(0)
    const [applicationCloseDate, setApplicationCloseDate] = useState(0)
    const [ExpectedResponseDate, setExpectedResponseDate] = useState(0)
    const [relevantExtracurriculars, setRelevantExtracurriculars] = useState<Extracurricular[]>([])
    const [notes, setNotes] = useState("")
    

    return (
        <div className = "app-add-form-wrapper">
            <div className = "app-add-form">
                <div className = "app-add-input-item">
                        <label htmlFor = "uniName">University Name</label>
                        <input name = "uniName" onChange = {(e) => {setUniName(e.target.value)}} defaultValue = {uniName} />
                </div>
                <div className = "app-add-input-item">
                        <label htmlFor = "programName">Program Name</label>
                        <input name = "programName" onChange = {(e) => {setProgramName(e.target.value)}} defaultValue = {programName} />
                </div>

                <div className = "app-add-input-item">
                        <label htmlFor = "appOpenDate">Application Open Date</label>
                        <input type = "date" name = "appOpenDate" onChange = {(e) => {setApplicationOpenDate(Date.parse(e.target.value))}} />
                </div>
                <div className = "app-add-input-item">
                        <label htmlFor = "appCloseDate">Application Close Date</label>
                        <input type = "date" name = "appCloseDate" onChange = {(e) => {setApplicationCloseDate(Date.parse(e.target.value))}} />
                </div>
                <div className = "app-add-input-item">
                        <label htmlFor = "responseDate">Expected Response Date</label>
                        <input type = "date" name = "responseDate" onChange = {(e) => {setExpectedResponseDate(Date.parse(e.target.value))}} />
                </div>

                <div className = "app-add-input-item">
                        <label htmlFor = "notes">Extra Notes</label>
                        <input name = "notes" onChange = {(e) => {setNotes(e.target.value)}} defaultValue = {notes} />
                </div>
            </div>
        </div>
    )
}


export default AppCreateForm