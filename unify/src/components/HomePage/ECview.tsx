import React from 'react'
import { Extracurricular } from '../@types'


interface ECviewProps {
    EC: Extracurricular
    onClick: Function;

}

const ECview = (props: ECviewProps) => {
    const { EC, onClick } = props 
    return (
        <div onClick = {() => onClick("/extracurriculars/" + EC._id)} className = "ec-view-item">
            <span>{EC.name}</span>   
        </div>
    )
}

export default ECview