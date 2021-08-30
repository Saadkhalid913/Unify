import React, {  useState} from 'react'
import { Application } from "./ApplicationsPage"
import FormInput from "../FormInput"



interface AppBoxProps  {
    getStyles: () => object;
    submitNewApp: (data: Application) => Promise<void>
}

const AppBox = (props: AppBoxProps) => {
    const [uniName, setUniName] = useState("")
    const [programName, setProgramName] = useState("")
    const [applicationOpenDate, setApplicationOpenDate] = useState(0)
    const [applicationCloseDate, setApplicationCloseDate] = useState(0)
    const [expectedResponseDate, setExpectedResponseDate] = useState(0)
    const [relevantExtracurriculars, setRelevantExtracurriculars] = useState([])
    const [includeAllExtraCurriculars, setIncludeAllExtraCurriculars] = useState(true)
    const [notes, setNotes] = useState("")

    return (
        <div className="app-add-box-wrapper" style={props.getStyles()}>
            <h2>Create a new application</h2>
            <FormInput type = "text" name = "University Name" onChange = {setUniName}/>
            <FormInput type = "text" name = "Program Name" onChange = {setProgramName}/>
            <FormInput type = "date" name = "Application Open Date" onChange = {setApplicationOpenDate}/>
            <FormInput type = "date" name = "Application Close Date" onChange = {setApplicationCloseDate}/>
            <FormInput type = "date" name = "Expected Response Date" onChange = {setExpectedResponseDate}/>
            <FormInput type = "text" name = "Extra Notes" onChange = {setNotes}/>

            <button onClick = {() => {
                props.submitNewApp({
                    uniName, programName,
                    applicationCloseDate, applicationOpenDate, 
                    expectedResponseDate, relevantExtracurriculars, 
                    includeAllExtraCurriculars, notes
                })
            }}
            
            className = "appbox-submit">Submit</button>
        </div>
    )
}


export default AppBox