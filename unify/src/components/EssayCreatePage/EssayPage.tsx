import React, { useContext } from 'react'
import { BrowserRouter, RouteComponentProps, Switch , Route} from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import EssayForm from './EssayForm'

const EssayPage = (props: RouteComponentProps) => {
    const { token } = useContext(tokenContext)

    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/essays/edit/:id" render = {(props: RouteComponentProps) =>  <EssayForm {...props} token = {token} edit = {true} />} />
                <Route path ="/essays/:id" render = {(props: RouteComponentProps) => <EssayForm {...props} token = {token} edit = {false} />} />
            </Switch>
        </BrowserRouter>
    )
}

export default EssayPage
