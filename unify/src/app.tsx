import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'

export default class App extends Component  {
    state = {}

    render() {
       return (
        <BrowserRouter>
            <Switch>
                <Route path = "/login" render = {(props) => <LoginPage {...props} />} />
                <Route path = "/signup" render = {(props) => <SignupPage {...props} />} />
            </Switch>
        </BrowserRouter>
       )
    }
}

