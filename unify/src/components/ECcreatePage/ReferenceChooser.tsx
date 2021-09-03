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

    if (props.references.length === 0) {
        return (
        <div className = "reference-box-wrapper">
         <h3>No references provided</h3>   
        <div className = "reference-add-wrapper">
            <h5>Add References</h5>
            <div>
            <input onChange = {(e) => setName(e.target.value)} type ="text" placeholder = "John Smith" />
            <input onChange = {(e) => setEmail(e.target.value)} type ="email" placeholder = "johnsmith@email.com" />
            <input onChange = {(e) => setNumber(e.target.value)} type ="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = "(123)-456-789" />
            <button onClick = {() => {
                props.setReferences([...props.references, {name, email, phoneNumber: number}])
            }} >Add Reference</button>
             </div>
        </div>
</div>
             )
    }

    return (
    <div className = "reference-box-wrapper">
        <div className = "heading-wrapper">
            <span>Reference Name</span>
            <span>Email</span>
            <span>Phone Number</span>
        </div>
        <div className = "references-wrapper">
        {props.references.map(ref => {
            return <div className = "reference-item" key = {ref.name}>
                <span>{ref.name}</span>
                <span>{ref.email || "No email provided"}</span>
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
            <h5>Add References</h5>
            <div>
            <input onChange = {(e) => setName(e.target.value)} type ="text" placeholder = "John Smith" />
            <input onChange = {(e) => setEmail(e.target.value)} type ="email" placeholder = "johnsmith@email.com" />
            <input onChange = {(e) => setNumber(e.target.value)} type ="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = "(123)-456-789" />
            <button onClick = {() => {
                props.setReferences([...props.references, {name, email, phoneNumber: number}])
            }} >Add Reference</button>
            </div>
        </div>
    </div>
    )

}

export default ReferenceChooser

