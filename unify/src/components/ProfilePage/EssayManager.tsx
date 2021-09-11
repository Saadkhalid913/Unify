import axios from 'axios'
import React, { Component } from 'react'
import { essay  } from "../@types"
import EssayViewer from './EssayViewer'
import { Link } from "react-router-dom"

const ROOT_URL = process.env.REACT_APP_root_url

interface EssayManagerProps {
    token: string;
}

interface EssayManagerState {
    essays: essay[];
    selectedEssay?: essay ;
}

export class EssayManager extends Component<EssayManagerProps> {
    state: EssayManagerState= {
        essays: [],
        selectedEssay: undefined,
    }

    async componentDidMount() {
        await this.getEssays()
    }

    render() {
        return (<React.Fragment>
                    <div className = "essay-manager-wrapper">
                        {this.state.essays.map(es => <div className = "essay-item" onClick = {() => this.setState({selectedEssay: es})}>{es.title}</div>)}
                        <Link to = "/essays/add">Add Essay</Link>
                    </div>
                    {this.state.selectedEssay && <EssayViewer onClose = { this.closeViewer } essay = {this.state.selectedEssay!} /> }
                </React.Fragment>)
    }


    closeViewer = () => this.setState({selectedEssay: undefined})

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