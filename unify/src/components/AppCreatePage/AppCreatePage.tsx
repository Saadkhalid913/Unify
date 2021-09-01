import React, { useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import AppCreateForm from './AppCreateForm'
import { Application } from "../@types"
const AppCreatePage = (props: RouteComponentProps) => {
    const token = useContext(tokenContext)
    if (!token) return <Redirect to = "/login" />

    return <AppCreateForm onSubmit = {(app: Application) => {console.log(app)}}/>

}

export default AppCreatePage