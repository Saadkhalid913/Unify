import axios from 'axios'
import React, { Component } from 'react'
import Sidebar from './Sidebar'

export interface Application {
    _id?: string;
    uniName: String;
    programName: String;
    applicationOpenDate: Number;
    applicationCloseDate: Number;
    expectedResponseDate? : Number;
    includeAllExtraCurriculars: Boolean;
    relevantExtracurriculars: string[];
    notes: String;
}


interface ApplicationsPageProps {
    token: string;
}

interface ApplicationPageState {
    applications: Application[];
    showingAppBox: Boolean;
}

export default class ApplicationsPage extends Component<ApplicationsPageProps> {
    state : ApplicationPageState = {
        applications: [],
        showingAppBox: false
    }

    async componentDidMount() {
        const { token }= this.props
        const response = await axios.get("http://localhost:3000/applications", {headers: {user_auth_token: token}})
        this.setState({applications : response.data})
    }

    render() {
        return (
            <Sidebar showAppBox = {this.showAppBox} />
        )
    }
    showAppBox = () => {
        this.setState({showingAppBox: !this.state.showingAppBox})
        console.log(this.state.showingAppBox)
    }
}