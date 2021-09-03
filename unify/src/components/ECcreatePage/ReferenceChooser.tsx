import React, {useState} from 'react'
import { reference } from "../@types"
interface referenceChooserProps {
    references: reference[]
    setReferences: (refs: reference[]) => void
}

const ReferenceChooser = (props: referenceChooserProps) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")

    return (
    <div className = "reference-box-wrapper">
        <div className = "references-wrapper">
        {props.references.map(ref => {
            return <div>
                <span>{ref.name}</span>
                <span>{ref.email || "no email provided"}</span>
                <span>{ref.phoneNumber || "No phone number provided"}</span>
                <button onClick = {() => {
                    const index = props.references.findIndex((r) => r.name === ref.name)
                    const newReferences = [...props.references]
                    newReferences.splice(index, 1)
                    props.setReferences(newReferences)
                }}>X</button>
                </div>
        })}
        </div>
        <div className = "reference-add-wrapper">
            <input onChange = {(e) => setName(e.target.value)} type ="text" placeholder = "John Smith" />
            <input onChange = {(e) => setEmail(e.target.value)} type ="email" placeholder = "johnsmith@email.com" />
            <input onChange = {(e) => setNumber(e.target.value)} type ="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = "(123)-456-789" />
            <button onClick = {() => {
                props.setReferences([...props.references, {name, email, phoneNumber: number}])
            }} >Add Reference</button>
        </div>
    </div>
    )

}

export default ReferenceChooser

