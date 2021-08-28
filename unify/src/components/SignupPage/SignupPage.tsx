import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SignupForm, {SignupData} from './SignupForm'
import Navbar from '../Navbar'


const SignupPage = (props: RouteComponentProps) => {
    return (
        <div className = "signup-page-wrapper">
            <Navbar />
            <SignupForm onSubmit={SubmitSignup}/>
        </div>

    )
}

async function SubmitSignup(data: SignupData) : Promise<void> {
    return new Promise((resolve, reject) => null)
}

export default SignupPage