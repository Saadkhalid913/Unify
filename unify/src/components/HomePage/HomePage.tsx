import React, { Fragment, useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import Navbar from '../Navbar'
import ApplicationsPage from './ApplicationsPage'



const Homepage = (props: RouteComponentProps) => {
    const { token } = useContext(tokenContext)

    if (!token) {
        return <Redirect to = "/login" />
    }

    return (
        <Fragment>
               <Navbar />
               <ApplicationsPage token = {token} />
        </Fragment>
    )
}


export default Homepage