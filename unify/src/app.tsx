import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import tokenContext from "./contexts/tokenContext"
import Homepage from './components/Homepage/Homepage'
import ApplicationPage from './components/ApplicationPage/ApplicationPage'
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component  {
    state = {
        token: ""
    }



    render() {
       return (
        <tokenContext.Provider value = {{token: this.state.token, setToken : this.setToken}}>
            <BrowserRouter>
            <Switch>
                
                <Route path = "/applications/:id" render = {(props) => <ApplicationPage {...props} />} />
                <Route path = "/login" render = {(props) => <LoginPage {...props} />} />
                <Route path = "/signup" render = {(props) => <SignupPage {...props} />} />
                <Route path = "/" render = {(props) => <Homepage {...props} />} />
            </Switch>
        </BrowserRouter>
        </tokenContext.Provider>
       )
    }
    setToken = (token: string): void =>{
        this.setState({token})
    }
    
    
}

