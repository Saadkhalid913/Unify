import axios from 'axios'
import app from 'express/lib/application'
import { appendFileSync } from 'fs'
import { Component } from 'react'
import { toast } from 'react-toastify'
import {Application} from "../@types"
import AppViewItem from './ApplicationView'
import {AiOutlinePlusCircle} from "react-icons/ai"

const ROOT_URL = process.env.REACT_APP_root_url

interface ApplicationManagerProps {
    token: string
    nextPage: (path: string) => void
}

interface ApplicationManagerState {
    apps: Application[]
}

export default class ApplicationManager extends Component<ApplicationManagerProps> {
    state: ApplicationManagerState =  {
        apps: []
    }

    async componentDidMount() {
        this.getApps()
    }


    render() {
        if (this.state.apps.length === 0) return    <div className = "app-box-wrapper app-box-wrapper-no-apps">
                                                        <h2 className = "no-apps-message"> No Applications To Show!</h2>
                                                        <button className = "app-add-button" onClick = {() => this.props.nextPage("/applications/add")}>Create New Application<AiOutlinePlusCircle/></button>
                                                    </div>

        return (<div className = "app-box-wrapper"> 
                       <h2>Your Applications</h2> 
                       <div className ="app-box-title">
                           <span>University Name</span> 
                           <span>Program Name</span> 
                        </div> 
                      {this.state.apps.map(app => <AppViewItem key ={app._id} onClick = {() => {this.props.nextPage("/applications/" + app._id)}} app = {app}/>)}  
                      <button className = "app-add-button" onClick = {() => this.props.nextPage("/applications/add")}>Create New Application<AiOutlinePlusCircle /></button>
                </div>)
    }


    getApps = async () => {
        try {
            const {token} = this.props
            const {data: AppData} = await axios.get(ROOT_URL + "/applications", {headers: {user_auth_token: token}})
            this.setState({apps: AppData})
        }
        catch (err: any) {
            toast.error("There was an error connecting to the server")
        }
    }


}
