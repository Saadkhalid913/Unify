import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import tokenContext from '../../contexts/tokenContext'
import { Extracurricular } from '../HomePage/ApplicationsPage'
import { Application } from '../HomePage/ApplicationsPage'
import Navbar from '../Navbar'
import ECBox from './ECBox'
import ExtracurricularViewer from './ExtracurricularViewer'

interface userData {
    extracurriculars: Extracurricular[];
    applications: Application[];

}

const ProfilePage = (props: RouteComponentProps) => {
    const { token } = useContext(tokenContext)
    const [showECbox, toggleECbox] = useState(false)
    const [noToken, setNoToken] = useState(false)
    const [user, setUser] = useState<userData>({applications: [], extracurriculars: []})

    useEffect(() => {
        if (!token) return setNoToken(true)
        axios.get(process.env.REACT_APP_root_url + "/users/data", {headers: {user_auth_token: token}})
                        .then(r => setUser(r.data))
                        .catch(err => toast.error("There was an error"))
    }, [setUser, token, setNoToken])

    if (noToken) return <Redirect to = "login" />

    if (user.extracurriculars.length === 0) {
        return <div>No EC's</div>
    }

    return (
        <Fragment>
            <Navbar />
            <div className="pfp-wrapper">
                <ExtracurricularViewer addNew = {() => toggleECbox(!showECbox)} extracurriculars = {user.extracurriculars} />
            </div>
            <ECBox 
                onScreen = {showECbox}
                submitEC = {async (newEC) => {
                const EC = await AddExtraCurricular(token, newEC)
                if (!EC) return
                const oldUser = {...user, extracurriculars: [...user.extracurriculars]}
                oldUser.extracurriculars.push(EC)
                setUser(oldUser)
                toggleECbox(!showECbox)
            }}/>
        </Fragment>
    )

}


async function AddExtraCurricular(token: String, ECdata: Extracurricular): Promise<Extracurricular | void>  {
    try {
        console.log(ECdata)
        const response = await axios.post(process.env.REACT_APP_root_url + "/extracurriculars", ECdata, {headers: {user_auth_token: token}})
        return response.data
    }
    catch(err: any) {
        toast.error(err.response.data)
        return undefined
    }
}

export default ProfilePage