import axios from 'axios'
import React, { Component } from 'react'

interface Application {
    _id: string;
    uniName: String;
    programName: String;
    applicationOpenDate: Number;
    applicationCloseDate: Number;
    expectedResponseDate? : Number;
    relevantExtracurriculars: string[];
    notes: String;
}


interface ApplicationsPageProps {
    token: string;
}

interface ApplicationPageState {
    applications: Application[]
}

export default class ApplicationsPage extends Component<ApplicationsPageProps> {
    state : ApplicationPageState = {
        applications: []
    }

    async componentDidMount() {
        const { token }= this.props
        const response = await axios.get("http://localhost:3000/applications", {headers: {user_auth_token: token}})
        this.setState({applications : response.data})
    }

    render() {
        return <div>hello </div>
}}