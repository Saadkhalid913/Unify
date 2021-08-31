import axios from 'axios'
import React, { Component, Fragment } from 'react'
import Sidebar from './Sidebar'
import AppBox from './AppBox'
import ApplicationList from './ApplicationList'
import { toast } from 'react-toastify'

toast.configure()

export interface Application {
    _id?: string;
    uniName: String;
    programName: String;
    applicationOpenDate: string | number;
    applicationCloseDate:  string | number ;
    expectedResponseDate? : string | number ;
    includeAllExtraCurriculars: number;
    relevantExtracurriculars: Extracurricular[];
    notes: String;
}

export interface Extracurricular {
    _id?: string;
    name: string,
    description: string,
    dateStarted: number | string;
    dateEnded?: number;
    onGoing?: boolean;
}


interface ApplicationsPageProps {
    token: string;
}

interface ApplicationPageState {
    applications: Application[];
    extracurriculars: any[];
    showingAppBox: Boolean;
}

export default class ApplicationsPage extends Component<ApplicationsPageProps> {
    state : ApplicationPageState = {
        applications: [],
        extracurriculars: [],
        showingAppBox: false
    }

    async componentDidMount() {
        const { token } = this.props
        const ApplicationsResponse = await axios.get(process.env.REACT_APP_root_url + "/applications", {headers: {user_auth_token: token}})
        this.setState({applications : ApplicationsResponse.data})

        const ECresponse = await axios.get(process.env.REACT_APP_root_url + "/extracurriculars", {headers: {user_auth_token: token}})
        this.setState({extracurriculars : ECresponse.data.extracurriculars})
    }

    render() {
        return (
           <Fragment>
                <div className = "applications-page">
                    <Sidebar showAppBox = {this.showAppBox} />
                    <ApplicationList applications = {this.state.applications} />
                </div>
                <AppBox extracurriculars = {this.state.extracurriculars} showAppBox = {this.showAppBox} submitNewApp = {this.submitNewApp} getStyles={this.getAppBoxStyles} />
           </Fragment>
        )
    }
    showAppBox = () => {
        this.setState({showingAppBox: !this.state.showingAppBox})
    }

    getAppBoxStyles = () => {
        if (this.state.showingAppBox) {
            return {display: "flex", opacity: "100%"}
        }
        else return {display: "none", opacity: "0%"}
    }

    submitNewApp = async (data: Application): Promise<void> => {
        try {
            const response = await axios.post(process.env.REACT_APP_root_url + "/applications", data, {headers: {user_auth_token: this.props.token }})
            const Application: Application = response.data
            const oldState = [...this.state.applications]
            oldState.push(Application)
            this.setState({applications: oldState})
        }
        catch (err: any) {
            toast.error(err.response.data)
        }
        this.showAppBox()
    }   
}