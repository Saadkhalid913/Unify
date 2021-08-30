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
        <React.Fragment>
            <Navbar />
        <div className = "login-page-wrapper">
            <LoginForm onSubmit = {async (data: LoginData) : Promise<void> => {
                const response = await axios.post(process.env.REACT_APP_root_url + "/users/login",  data)
                if (response.status !== 200) {
                    toast.warning("There was an error")
                    return 
                }
                setToken(response.data.user_auth_token)
                props.history.push("/")

            }}/>
        </div>
        </React.Fragment>
    )
}


export default LoginPage