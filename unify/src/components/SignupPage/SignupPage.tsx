import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SignupForm, {SignupData} from './SignupForm'
import Navbar from '../Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
toast.configure()


const SignupPage = (props: RouteComponentProps) => {
    return (
        <div className = "signup-page-wrapper">
            <Navbar />
            <SignupForm onSubmit={SubmitSignup}/>
        </div>

    )
}

async function SubmitSignup(data: SignupData) : Promise<void> {
    const response = await axios.post("http://localhost:3000/users", data)
    const JSONdata = response.data 
    if (response.status !== 200) {
        toast.error("There was an error")
        return new Promise((resolve, reject) => resolve(undefined))
    }

    const token = JSONdata.user_auth_token 
    localStorage.setItem("user_auth_token", token)
    toast.info("Account created sucessfuly")
    window.location.href = "/"
}

export default SignupPage