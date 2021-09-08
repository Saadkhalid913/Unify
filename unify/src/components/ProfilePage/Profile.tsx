import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import tokenContext from '../../contexts/tokenContext'
import { EssayManager } from './EssayManager'

export const ProfilePage = (props: RouteComponentProps) => {
    const {token} = useContext(tokenContext)
    return (
        <div className = "pfp-wrapper">  
            <EssayManager token = {token} />


        </div>
    )
}