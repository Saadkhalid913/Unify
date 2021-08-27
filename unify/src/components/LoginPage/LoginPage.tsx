import React from 'react'
import LoginForm, { LoginData } from './LoginForm'
import axios from "axios"
import { RouteComponentProps } from 'react-router-dom'


const LoginPage = (props: RouteComponentProps) => {
    return (
        <div className = "login-page-wrapper">
            <LoginForm onSubmit = {HandleLogin}/>
        </div>
    )
}

async function HandleLogin(data: LoginData): Promise<void> {
    // WIP 
    const response = await axios.post("http://localhost:3000/users/login",  data, {headers: {}})
    console.log(response.data)
}

export default LoginPage