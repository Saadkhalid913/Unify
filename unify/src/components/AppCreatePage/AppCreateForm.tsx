import { ApplicationSubmission, Extracurricular } from "../@types"
import React , {useState} from 'react'
import * as joi from "joi"
import ECchooser from "./ECchooser"
import { toast } from "react-toastify"

interface AppCreateFormProps {
    onSubmit: (app: ApplicationSubmission) => void
    ECs: Extracurricular[];
}
const AppCreateForm = (props: AppCreateFormProps) => {
    const [uniName, setUniName] = useState("")
    const [programName, setProgramName] = useState("")
    const [applicationOpenDate, setApplicationOpenDate] = useState(0)
    const [applicationCloseDate, setApplicationCloseDate] = useState(0)
    const [expectedResponseDate, setExpectedResponseDate] = useState(0)
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
                <div className = "app-add-input-item">
                    <ECchooser ECs = {props.ECs} chosenECs = {relevantExtracurriculars} onUpdate = {setRelevantExtracurriculars} />
                </div>
            </div>
            <button onClick = { async () => {
                const app: ApplicationSubmission = {uniName, programName, applicationOpenDate, applicationCloseDate, expectedResponseDate, notes, relevantExtracurriculars}
                const isValid = await ValidateApplication(app)
                if (isValid) return props.onSubmit(app)
                else return 
            }}>
                
                Submit
            </button>
        </div>
    )
}


async function ValidateApplication(app: Object): Promise<boolean>  {
    const schema = joi.object({
        uniName: joi.string()
            .min(6)
            .max(255)
            .required()
            .messages({
                "string.min": "University name must be at least 6 characters"
            }),
        
        programName: joi.string()
                        .min(6)
                        .max(255)
                        .required(),
        
        applicationOpenDate: joi.date()
                                .min(1)
                                .options({convert: true})
                                .required()
                                .messages({"date.min": "Please Enter a valid application open date"}),

        applicationCloseDate: joi.date()
                                .min(6)                                
                                .options({convert: true})
                                .required()
                                .messages({"date.min": "Please Enter a valid application close date"}),

        expectedResponseDate : joi.date()
                                .min(6)
                                .options({convert: true})
                                .messages({"date.min": "Please Enter a valid response date"}),
                                

        relevantExtracurriculars: joi.array(),

        notes: joi.string().min(1).max(4096),

        includeAllExtraCurriculars: joi.number()
    })

    try {
        await schema.validateAsync(app)
        return true
    }
    catch(err: any) {
        toast.error(err.details[0].message)
        return false 
    }
}

export default AppCreateForm