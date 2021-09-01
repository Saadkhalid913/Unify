import axios from 'axios'
import { Component } from 'react'
import { toast } from 'react-toastify'
import {Application} from "../@types"
import AppViewItem from './ApplicationView'

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
        return (<div className = "app-box-wrapper"> 
                       <div className ="app-box-title">
                           <span>University Name</span> 
                           <span>Program Name</span> 
                        </div> 
                      {this.state.apps.map(app => <AppViewItem key ={app._id} onClick = {() => {this.props.nextPage("/applications/" + app._id)}} app = {app}/>)}  
                      <button className = "app-add-button" onClick = {() => this.props.nextPage("/applications/add")}>Create New</button>
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
