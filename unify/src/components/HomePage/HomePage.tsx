import React, {useContext} from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import ApplicationManager from './ApplicationManager'
import ECmanager from './ECmanager'
import Navbar from '../Navbar'

const Homepage = (props: RouteComponentProps) => {

    const {token} = useContext(tokenContext)
    if (!token) return <Redirect to="/login"/>
    return (
            <div className = "homepage-wrapper">
                <div className = "homepage">
                    <Navbar text = "Log out"/>
                    <ApplicationManager token = {token} nextPage = {props.history.push} />
                    <ECmanager token = {token} nextPage = {props.history.push}/>
                </div>
            </div>
        ) 
        

}


export default Homepage