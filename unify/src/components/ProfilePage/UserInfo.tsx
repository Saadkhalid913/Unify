import axios from 'axios'
import React , {useState, useEffect} from 'react'
import { toast } from 'react-toastify'

interface UserInfoManagerProps {
    token: string
}

const ROOT_URL = process.env.REACT_APP_root_url

const UserInfoManager = (props: UserInfoManagerProps) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    
    useEffect(() => {
        axios.get(ROOT_URL + "/users/data", {headers: {user_auth_token: props.token}})
                .then(r => {
                    setEmail(r.data.email)
                    setUsername(r.data.username)
                }).catch(err => toast.error("Could not get your profile information"))
    }, [setEmail, setUsername, props.token])

    return (
        <div className = "user-info-wrapper">
            <div>
                <h1>Your Email Address: {email}</h1>
                <h2>Your Username: {username}</h2>
            </div>
        </div>
    )
}

export default UserInfoManager