import React, { useContext, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import AppCreateForm from './AppCreateForm'
import { Application, ApplicationSubmission, Extracurricular } from "../@types"
import axios from 'axios'
import { toast } from 'react-toastify'


const ROOT_URL = process.env.REACT_APP_root_url

const AppCreatePage = (props: RouteComponentProps) => {
    const {token} = useContext(tokenContext)
    const [ECs, setECs] = useState<Extracurricular[]>()

    useEffect(() => {
        console.log(token)
        getECs(token).then(ECdata => setECs(ECdata))
    }, [token])


    if (!token) return <Redirect to = "/login" />

    return <AppCreateForm ECs ={ECs as Extracurricular[]} onSubmit = {(app: ApplicationSubmission) => {SubmitApplication(token, app, props.history.replace)}}/>

}


async function getECs(token: string): Promise<Extracurricular[] | undefined> {
    try {
        const response = await axios.get(ROOT_URL + "/extracurriculars", {headers: {user_auth_token: token}})
        const ECdata: Extracurricular[] = response.data
        return ECdata
    }
    catch(err: any){
        toast.error(err.response)
        return undefined
    }
}


async function SubmitApplication(token: string, app: ApplicationSubmission, redirect: (path: string) => void): Promise<Application | void> {
    try {
        const response = await axios.post(ROOT_URL + "/applications", app, {headers: {user_auth_token: token}})
        redirect(response.data._id)
    }    
    catch(err) { 
        console.log(err)
        return undefined
    }
}

export default AppCreatePage