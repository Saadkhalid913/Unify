import React, {ChangeEvent, useState} from 'react'

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
                <div className="login-form">
                    <input type = "email" name = "email" onChange={(e: ChangeEvent<HTMLInputElement> ) : any => setEmail(e.target.value)} />
                    <input type = "password" name = "password" onChange={(e: ChangeEvent<HTMLInputElement> ) : any => setPassword(e.target.value)}/>
                    <button className="login-submit-btn" onClick={() => props.onSubmit({email, password})}>Log in</button>
                </div>
            </div>
        </div>
    )
}


export default LoginForm