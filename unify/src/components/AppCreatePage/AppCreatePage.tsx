import React, { useContext, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import AppCreateForm from './AppCreateForm'
import { Application, Extracurricular } from "../@types"
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

    return <AppCreateForm ECs ={ECs as Extracurricular[]} onSubmit = {(app: Application) => {console.log(app)}}/>

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

export default AppCreatePage