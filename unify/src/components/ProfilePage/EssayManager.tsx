import axios from 'axios'
import React, { Component } from 'react'
import { essay  } from "../@types"

const ROOT_URL = process.env.REACT_APP_root_url

interface EssayManagerProps {
    token: string
}

interface EssayManagerState {
    essays: essay[]
}

export class EssayManager extends Component<EssayManagerProps> {
    state: EssayManagerState= {
        essays: []
    }

    async componentDidMount() {
        await this.getEssays()
    }

    render() {
        return (<div className = "essay-manager-wrapper">
                    {this.state.essays.map(es => <p>{es.title}</p>)}
                </div>)
    }




    getEssays = async () => {
        try {
            const {data: responseData} = await axios.get(ROOT_URL + "/essays", {headers: {user_auth_token: this.props.token}})
            this.setState({essays: responseData})
        }
        catch(err: any) {
            console.log(err)
        }
    }
}