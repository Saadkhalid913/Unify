import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { Extracurricular } from '../@types'
import ECview from './ECview'


const ROOT_URL = process.env.REACT_APP_root_url

interface ECmanagerProps {
    token: string;
    nextPage: (path: string) => void;
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
                      <h2>Your Extracurriculars</h2>
                      {this.state.ECs.map(ec => <ECview key={ec._id} onClick = {this.props.nextPage} EC = {ec}/>)}  
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