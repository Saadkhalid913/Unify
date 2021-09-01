
import React from 'react'
import { Extracurricular} from "../@types"

interface ECchooserProps {
    ECs: Extracurricular[]
    chosenECs: Extracurricular[]
    onUpdate: (ECs: Extracurricular[]) => void 
}


const ECchooser = (props: ECchooserProps) => {
    const { chosenECs, onUpdate } = props
    if (!props.ECs) return <div></div>
    return <div>
        {props.ECs.map(ec => <div
            key = {ec._id} 
            className = "ec-chooser-item"
            onClick = {(e: any) => {
            if (chosenECs.includes(ec)) {
                e.target.className = "ec-chooser-item"
                const updated = [...chosenECs]
                const index = updated.indexOf(ec)
                updated.splice(index, 1)
                onUpdate(updated)

            }
            else {
                e.target.className = "ec-chooser-item-selected"
                onUpdate([...chosenECs, ec])



            }
        }}>{ec.name}</div>)}
    </div>

}



export default ECchooser