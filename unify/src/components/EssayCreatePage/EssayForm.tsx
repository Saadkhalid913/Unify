import axios from 'axios'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import { essaySubmission } from "../@types"

const ROOT_URL = process.env.REACT_APP_root_url

interface EssayFormProps extends RouteComponentProps{
    token: String,
    edit?: boolean
}

export default class EssayForm extends Component<EssayFormProps> {
    state = {
        title: "",
        body: "",
        targetSchool: ""
    }

    async componentDidMount() {
        try {
            //@ts-ignore
            const { data: essay }= await axios.get(ROOT_URL + "/essays/" + this.props.match.params.id, {headers: {user_auth_token: this.props.token}})
            const { title, body, targetSchool} = (essay as essaySubmission)
            this.setState({ title, body, targetSchool})
        }
        catch(err) {
            toast.error("Error fetching essay data")
        }
    }

    render() {
        if (this.props.edit) return (
            <div className = "essay-form-wrapper">
                <div className="essay-form">

                    <div className = "essay-form-input">
                        <label htmlFor="title">Essay Title</label>
                        <input type = "text" name = "title" defaultValue = {this.state.title} onChange = { e => this.setState({title: e.target.value})} />
                    </div>

                    <div className = "essay-form-input">
                        <label htmlFor="body">Essay Body</label>
                        <textarea name = "body" defaultValue = {this.state.body} onChange = { e => this.setState({body: e.target.value})}/>
                    </div>

                    <button onClick = {this.submitEdit}>Submit</button>
                </div>
            </div>
        )
        return (
        <div className = "essay-form-wrapper">
                    <div className="essay-form">

                        <div className = "essay-form-input">
                            <label htmlFor="title">Essay Title</label>
                            <input type = "text" name = "title" defaultValue = {this.state.title} onChange = { e => this.setState({title: e.target.value})} />
                        </div>

                        <div className = "essay-form-input">
                            <label htmlFor="body">Essay Body</label>
                            <textarea name = "body" defaultValue = {this.state.body} onChange = { e => this.setState({body: e.target.value})}/>
                        </div>

                        <button onClick = {this.submitNew}>Submit</button>
                    </div>
                </div>
    )
    }


    submitEdit = async () => {
        const {title, body, targetSchool} = this.state;
        const newEssay : essaySubmission = {title, body, targetSchool}

        try {
            //@ts-ignore
            const { data } = await axios.put(ROOT_URL + "/essays/" + this.props.match.params.id, newEssay, {headers: {user_auth_token: this.props.token}})
            console.log(data)
        }   
        catch(err: any) {
            console.log(err)
        }
    
    }

    submitNew = async () => {
        const {title, body, targetSchool} = this.state;
        const newEssay : essaySubmission = {title, body, targetSchool}

        try {
            //@ts-ignore
            const { data } = await axios.post(ROOT_URL + "/essays" , newEssay, {headers: {user_auth_token: this.props.token}})

        }   
        catch(err: any) {
            console.log(err)
        }
    
    }
}