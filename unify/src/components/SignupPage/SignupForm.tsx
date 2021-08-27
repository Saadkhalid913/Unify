import React , {useState} from 'react'
import FormInput from '../FormInput'

export interface SignupData {
    username: String;
    email: String;
    password: String
}

export interface SignupFormProps {
    onSubmit: (data : SignupData) => Promise<void>
}

const SignupForm = (props: SignupFormProps) => {
    const [username, setUsername] = useState("")    
    const [email, setEmail] = useState("")    
    const [password, setPassword] = useState("")    

    return (
        <div className = "signup-form-wrapper">
            <div className = "signup-page">
                <FormInput name = "Username" type = "text" onChange = {setUsername}/>
                <FormInput name = "Email" type = "email" onChange = {setEmail}/>
                <FormInput name = "Password (Minimum 8 characters" type = "password" onChange = {setPassword}/>
            </div>
            <button onClick ={() => props.onSubmit({username, email, password})} ></button>
        </div>
    )
}

export default SignupForm