import React, {Component} from 'react'
import * as joi from "joi"
import { ExtracurricularSubmission } from "../@types" 
import { toast } from 'react-toastify'


interface ECcreateFormProps {
    onSubmit: (EC: ExtracurricularSubmission) => void 
}

interface ECcreateFormState extends ExtracurricularSubmission {
}


export default class ECcreateForm extends Component<ECcreateFormProps> {
    state : ECcreateFormState = {
        name: "",
        description: "",
        dateStarted: 0,
        dateEnded: 0,
        onGoing: false
    }


    render(){
        return (
            <div className = "ec-create-form-wrapper">
                <div className = "ec-create-form">
                    
                    <div className = "ec-input-wrapper">
                        <label htmlFor = "name">Extracurricular Name</label>
                        <input name = "name" onChange = {(e) => {this.setState({name: e.target.value})}}/>
                    </div>


                    <div className = "ec-input-wrapper">
                        <label htmlFor = "description">Extracurricular Description</label>
                        <input name = "description" onChange = {(e) => {this.setState({description: e.target.value})}}/>
                    </div>

                    <div className = "ec-input-wrapper">
                        <label htmlFor = "dateStarted">Start Date</label>
                        <input type= "date" name = "dateStarted" onChange = {(e) => {this.setState({dateStarted: Date.parse(e.target.value)})}}/>
                    </div>
                    
                    <div className = "ec-input-wrapper">
                        <label htmlFor = "dateEnded">End Date</label>
                        {
                        (this.state.onGoing) ? 
                        <input type="date" disabled name = "dateEnded" onChange = {(e) => {this.setState({dateEnded: Date.parse(e.target.value)})}}/> :
                        <input type= "date" name = "dateEnded" onChange = {(e) => {this.setState({dateEnded: Date.parse(e.target.value)})}}/>
                        }
                    </div>

                    <button onClick = {() => this.setState({onGoing : !this.state.onGoing, })} 
                            className = {((this.state.onGoing) ? "ec-ongoing-toggle-true": "ec-ongoing-toggle")}>
                    Ongoing?                                     
                    </button>

                </div>
                <button onClick = {async () => {
                    const isValid = await ValidateEC(this.state)
                    if (isValid)
                        this.props.onSubmit(this.state)
                    }}>Submit</button>
            </div>
        )
    
    }
}



async function ValidateEC(EC: ExtracurricularSubmission): Promise<boolean> {
    const schema = joi.object({
        name: joi.string()
            .min(6)
            .max(255)
            .required()
            .messages({
                "string.max": "Please limit name to 255 characters.",
                "string.required": "Please enter a name.",
                "string.min": "Please enter a name."
            }),
        
        description: joi.string()
                        .min(6)
                        .max(4096)
                        .required()
                        .messages({
                            "string.max": "Please limit description to 4096 characters.",
                            "string.min": "Please enter a description.",
                            "string.required": "Please enter a description."
                        }),
        
        dateStarted: joi.date()
                                .min(1)
                                .options({convert: true})
                                .required(),

        dateEnded: joi.date()
                                .min(1)
                                .options({convert: true}),

        onGoing :  joi.boolean()
    })

    try {
        await schema.validateAsync(EC)
        return true
    }
    catch(err: any) {
        toast.error(err.details[0].message)
        return false
    }
}