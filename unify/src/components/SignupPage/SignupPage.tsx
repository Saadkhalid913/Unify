import React, { Fragment, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SignupForm, {SignupData} from './SignupForm'
import Navbar from '../Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import tokenContext from '../../contexts/tokenContext'
import * as joi from "joi"
toast.configure()


const SignupPage = (props: RouteComponentProps) => {
    const { setToken } = useContext(tokenContext)
    return (
        <Fragment>
            <Navbar />
             <div className = "signup-page-wrapper">
            <SignupForm onSubmit={(data: SignupData) => SignUp(data, setToken, props.history.replace)}/>
            </div>
        </Fragment>
    )
}


async function SignUp(data: SignupData, setToken: (token: string) => void, redirect: (path:string) => void) : Promise<void> {
    if (! await ValidateSignup(data)) return  
    try {
        const response = await axios.post(process.env.REACT_APP_root_url + "/users", data)
        if (response.status !== 200) {
            toast.error("There was an error")
            return new Promise((resolve, reject) => resolve(undefined))
        } 
        const { user_auth_token } = response.data
        setToken(user_auth_token)
        redirect("/")
    }
    catch(err: any) {
        if (err.response) toast.error(err.response.data)
        else toast.error("There was en error conntecting to the server")
    }
}


async function ValidateSignup(data: SignupData): Promise<boolean> {
    const schema = joi.object({
        email: joi.string().email({tlds: {allow: false}}),
        username: joi.string().min(6).max(255),
        password: joi.string().min(6).max(255)
    })

    try {
        await schema.validateAsync(data)
        return true
    }
    catch(err) {
        console.log(err)
        return false 
    }
}



export default SignupPage