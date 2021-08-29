import React, { Fragment, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SignupForm, {SignupData} from './SignupForm'
import Navbar from '../Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import tokenContext from '../../contexts/tokenContext'
toast.configure()


const SignupPage = (props: RouteComponentProps) => {
    const { setToken } = useContext(tokenContext)
    return (
        <Fragment>
            <Navbar />
             <div className = "signup-page-wrapper">
            <SignupForm onSubmit={async (data: SignupData) => {
                const response = await axios.post("http://localhost:3000/users", data)
                if (response.status !== 200) {
                    toast.error("There was an error")
                    return new Promise((resolve, reject) => resolve(undefined))
                } 
            
                const { user_auth_token } = response.data
                setToken(user_auth_token)
                console.log("set token ")
                toast.info("Account created successfuly")
                props.history.push("/")
            }}/>
            </div>
        </Fragment>
    )
}




export default SignupPage