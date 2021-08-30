
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import tokenContext from '../../contexts/tokenContext'
import { Extracurricular } from '../HomePage/ApplicationsPage'
import { Application } from '../HomePage/ApplicationsPage'
import ExtracurricularViewer from './ExtracurricularViewer'

const ProfilePage = (props: RouteComponentProps) => {
    const { token } = useContext(tokenContext)
    const [noToken, setNoToken] = useState(false)
    const [user, setUser] = useState({})


    useEffect(() => {
        if (!token) return setNoToken(true)
        axios.get(process.env.REACT_APP_root_url + "/users/data", {headers: {user_auth_token: token}})
                        .then(r => setUser(r.data))
                        .catch(err => toast.error("There was an error"))
    }, [setUser, token, setNoToken])

    console.log(user)
    if (noToken) return <Redirect to = "login" />

    return (
        //@ts-ignore
        <ExtracurricularViewer extracurriculars = {user.extracurriculars} />
    )

}

export default ProfilePage