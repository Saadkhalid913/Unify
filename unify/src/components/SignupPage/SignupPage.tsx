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
    if (response.status !== 200) {
        toast.error("There was an error")
        return new Promise((resolve, reject) => resolve(undefined))
    } 
    toast.info("Account created successfuly")
    window.location.href = "/login"
}

export default SignupPage