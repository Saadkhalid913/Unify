import React, { useContext } from 'react'
import LoginForm, { LoginData } from './LoginForm'
import axios from "axios"
import { RouteComponentProps } from 'react-router-dom'
import Navbar from '../Navbar'
import tokenContext from '../../contexts/tokenContext'
import { toast } from 'react-toastify'


const LoginPage = (props: RouteComponentProps) => {
    const { setToken } = useContext(tokenContext)
    return (
        <div className = "login-page-wrapper">
            <Navbar />
            <LoginForm onSubmit = {async (data: LoginData) : Promise<void> => {
                const response = await axios.post("http://localhost:3000/users/login",  data)
                if (response.status !== 200) {
                    toast.warning("There was an error")
                    return 
                }
                setToken(response.data.user_auth_token)
                console.log(response.data)

            }}/>
        </div>
    )
}


export default LoginPage