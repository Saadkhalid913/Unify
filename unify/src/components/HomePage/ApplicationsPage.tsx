import axios from 'axios'
import React, { Component, Fragment } from 'react'
import Sidebar from './Sidebar'
import AppBox from './AppBox'

export interface Application {
    _id?: string;
    uniName: String;
    programName: String;
    applicationOpenDate: Number | string;
    applicationCloseDate: Number | string;
    expectedResponseDate? : Number | string;
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
           <Fragment>
                <Sidebar showAppBox = {this.showAppBox} />
                <AppBox submitNewApp = {this.submitNewApp} getStyles={this.getAppBoxStyles} />
           </Fragment>
        )
    }
    showAppBox = () => {
        this.setState({showingAppBox: !this.state.showingAppBox})
        console.log(this.state.showingAppBox)
    }

    getAppBoxStyles = () => {
        if (this.state.showingAppBox) {
            return {display: "flex", opacity: "100%"}
        }
        else return {display: "none", opacity: "0%"}
    }

    submitNewApp = (data: Application) :Promise<void> => {
        console.log(data)
        return new Promise((resolve, reject) => resolve(undefined))
    }
}