import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SignupForm, {SignupData} from './SignupForm'

const SignupPage = (props: RouteComponentProps) => {
    return (
        <SignupForm onSubmit={SubmitSignup}/>
    )
}

async function SubmitSignup(data: SignupData) : Promise<void> {
    console.log(data)
    return new Promise((resolve, reject) => null)
}

export default SignupPage