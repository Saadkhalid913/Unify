import axios from 'axios'
import React, { useContext , useState , useEffect} from 'react'
import { dateToDaysRemaining } from '../../utils/dateFunctions'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
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


    if (!token) return <Redirect to ="/login" />
    if (!App) return <div>No App Found</div>
    else return (
        <div className= "app-page-wrapper">
            <div className = "app-page">
                <div className = "app-page-heading-wrapper">
                    <h2>{App.uniName}</h2>
                    <h4>{App.programName}</h4>
                </div>
                <div className = "app-dates">
                    <div>Application opens: {App.applicationOpenDate.substr(0,10)} ({dateToDaysRemaining(App.applicationOpenDate)})</div>
                    <div>Application closes: {App.applicationCloseDate.substr(0,10)} ({dateToDaysRemaining(App.applicationCloseDate)})</div>
                    <div>Expected response date: {App.expectedResponseDate.substr(0,10)} ({dateToDaysRemaining(App.expectedResponseDate)})</div>
                </div>
                <div className = "app-page-ec-wrapper">
                    <h4>Relevant Extracurriculars</h4>
                    <div className = "app-page-ecs">
                        {App.relevantExtracurriculars.map(ec => <div key = {ec._id} onClick = {() => {props.history.push("/extracurriculars/" + ec._id)}}>{ec.name}</div>)}
                    </div>
                </div>

                <div className = "app-page-notes">
                    <h4>Notes</h4>
                    {App.notes}
                    </div>
                <button className = "app-delete-button" onClick = {() => deleteApplication(App, token, props.history.replace)}>Delete</button>
            </div>
        </div>
    )
}


async function deleteApplication(App: Application, token: string, redirect: Function) {
    try {
        await axios.delete(ROOT_URL + "/applications/" + App._id, {headers: {user_auth_token: token}})
        redirect("/")
    }
    catch(err){
        toast.error("There was an error deleting your application")
    }
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