import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Homepage from './components/HomePage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import tokenContext from "./contexts/tokenContext"
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './components/ProfilePage/Profile'

export default class App extends Component  {
    state = {
        token: ""
    }



    render() {
        console.log(process.env)
       return (
        <tokenContext.Provider value = {{token: this.state.token, setToken : this.setToken}}>
            <BrowserRouter>
            <Switch>
                <Route path = "/login" render = {(props) => <LoginPage {...props} />} />
                <Route path = "/signup" render = {(props) => <SignupPage {...props} />} />
                <Route path = "/me" exact render = {(props) => <ProfilePage {...props} />} />
                <Route path = "/" exact render = {(props) => <Homepage {...props} />} />
            </Switch>
        </BrowserRouter>
        </tokenContext.Provider>
       )
    }
    setToken = (token: string): void =>{
        this.setState({token})
    }
    
    
}

