import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage'

export default class App extends Component  {
    state = {}

    render() {
       return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" render = {(props) => <LoginPage {...props} />} />
            </Switch>
        </BrowserRouter>
       )
    }
}

