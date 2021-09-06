import React, { useContext } from 'react'
import LoginForm, { LoginData } from './LoginForm'
import axios from "axios"
import { RouteComponentProps } from 'react-router-dom'
import Navbar from '../Navbar'
import * as joi from "joi"
import tokenContext from '../../contexts/tokenContext'
import { toast } from 'react-toastify'


const LoginPage = (props: RouteComponentProps) => {
    const { setToken } = useContext(tokenContext)
    return (
        <React.Fragment>
            <Navbar />
        <div className = "login-page-wrapper">
            <LoginForm onSubmit = {(data: LoginData) => LogIn(data, setToken, props.history.replace)}/>
        </div>
        </React.Fragment>
    )
}

async function LogIn(data: LoginData, setToken: (t: string) => void, redirect: (path: string) => void) : Promise<void> {
    if (!await ValidateLogin(data)) return 
    try {
        const response = await axios.post(process.env.REACT_APP_root_url + "/users/login",  data)
        setToken(response.data.user_auth_token)
        redirect("/")
    }
    catch(err: any) {

    if (err.response) toast.error(err.response.data)
    else toast.error("There was an error connecting to the server")
    }

}

async function ValidateLogin(data: LoginData): Promise<boolean> {
    const schema = joi.object({
        email: joi.string().email({ tlds: { allow: false } }),
        password: joi.string()
    })

    try {
        await schema.validateAsync(data)
        return true
    }
    catch(err: any) {
        toast.error(err.details[0].message)
        return false
    }

}


export default LoginPage