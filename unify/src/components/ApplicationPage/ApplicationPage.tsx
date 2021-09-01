import axios from 'axios'
import React, { useContext , useState , useEffect} from 'react'

import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import { Application } from '../@types'

const ROOT_URL = process.env.REACT_APP_root_url

const ApplicationPage = (props: RouteComponentProps) => {
    // @ts-ignore
    const AppID = props.match.params.id
    const { token } = useContext(tokenContext)

    const [App, setApp] = useState<Application>()
    useEffect(() => {
        getAppData(token, AppID).then(data => setApp(data))
    }, [setApp, token, AppID])

    console.log(App)


    if (!token) return <Redirect to ="/login" />
    if (!App) return <div>No App Found</div>
    else return <div>App Found!</div>
}


async function getAppData(token: String, ID: string) : Promise<Application | undefined> {
    try {
        const { data : AppData } = await axios.get(ROOT_URL + "/applications/" + ID, {headers: {user_auth_token: token}})
        return AppData
    }
    catch(err) {
        console.log(err)
        return undefined
    }
}


export default ApplicationPage