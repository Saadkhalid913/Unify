import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { Extracurricular } from '../@types'



const ROOT_URL = process.env.REACT_APP_root_url

interface ECmanagerProps {
    token: string
}

interface ECmanagerState {
    ECs: Extracurricular[]
}
 
export default class ECmanager extends Component<ECmanagerProps> {
    state: ECmanagerState = {
        ECs: []
    }

    async componentDidMount() {
        await this.getECdata()
    }

    render() {
        return (<div className = "ec-box-wrapper"> 
                      {this.state.ECs.map(ec => <p>{ec.name}</p>)}  
                </div>)
    }

    getECdata = async () => {
        try {
            const { token } = this.props
            const { data: ECdata} = await axios.get(ROOT_URL + "/extracurriculars", {headers: {user_auth_token: token}})
            this.setState({ECs: ECdata})
        }
        catch(err) {
            toast.error("There was an error connecting to the server")
        }
    }

}