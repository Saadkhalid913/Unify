import React, {useContext, Fragment} from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import ApplicationManager from './ApplicationManager'
import ECmanager from './ECmanager'

const Homepage = (props: RouteComponentProps) => {

    const {token} = useContext(tokenContext)
    if (!token) return <Redirect to="/login"/>
    return (
            <Fragment>
                <ECmanager token = {token}/>
                <ApplicationManager token = {token} nextPage = {props.history.push} />
            </Fragment>
        ) 
        

}


export default Homepage