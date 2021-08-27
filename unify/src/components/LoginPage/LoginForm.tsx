import React, {useState} from 'react'
import FormInput from '../FormInput'
import { Link } from "react-router-dom"
export interface LoginData {
    email : String;
    password : String
}

interface LoginFormProps {
    onSubmit: (data: LoginData) => any
}

const LoginForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className = "login-form-wrapper">
            <div className = "login-form">
                    <FormInput type = "email" name = "email" onChange = {setEmail} />
                    <FormInput type = "password" name = "password" onChange = {setPassword} />
                    <button className="login-submit-btn" onClick={() => props.onSubmit({email, password})}>Log in</button>
            </div>
            <Link to = "/signup">Don't have an account? Sign up here.</Link>
        </div>
    )
}


export default LoginForm