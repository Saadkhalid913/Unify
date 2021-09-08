import React, { Component } from 'react'
import { RouteComponentProps , Link} from 'react-router-dom'


interface EssayFormProps extends RouteComponentProps{
    token: String,
    edit?: boolean,
}

export default class EssayForm extends Component<EssayFormProps> {
    state = {
        title: "",
        body: "",
        targetSchool: ""
    }

    render() {
        if (this.props.edit) return <h1 onClick={() => this.props.history.goBack()}>Home</h1>
        return <div>EssayForm</div>
    }
}