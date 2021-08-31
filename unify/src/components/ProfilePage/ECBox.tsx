import React, { useState} from 'react'

import FormInput from '../FormInput'
import { Extracurricular } from '../HomePage/ApplicationsPage'

interface ECBoxProps {
    submitEC: (EC: Extracurricular) => void
    onScreen: boolean
}


const ECBox = (props: ECBoxProps) => {
    const [name, setName] = useState("")
    const [description, setDesc] = useState("")
    const [dateStarted, setDateStarted] = useState(0)
    const [dateEnded, setDateEnded] = useState(0)
       
    const screenState = (props.onScreen) ? "ecbox-wrapper" : "ecbox-wrapper-offscreen"
        return (
            <div className ={screenState}>
                <FormInput name = "Extracurricular name" type="text" onChange={setName}/>
                <FormInput name = "Extracurricular description" type="text"  onChange={setDesc}/>
                <FormInput name = "Date Started" type="date" onChange={setDateStarted}/>
                <FormInput name = "Date Ended" type="date" onChange={setDateEnded}/>
                <button onClick = {() => props.submitEC({name, description, dateStarted, dateEnded})}>Submit</button>
            </div>
        )
    
}

export default ECBox