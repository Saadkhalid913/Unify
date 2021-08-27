
import { sample } from 'lodash'
import React, { Component } from 'react'
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom"

export default class App extends Component  {
    state = {}

    render() {
       return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" render = {(props) => <Sample {...props}/>}/>
            </Switch>
        </BrowserRouter>
       )
    }
}

const Sample = (props: any) => <div>HEllo</div> 