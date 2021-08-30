import React, {} from 'react'
import { Extracurricular } from "./ApplicationsPage"


interface ECchooserProps {
    exracurriculars: Extracurricular[];
    handleUpdate: (ec: Extracurricular) => void
}

const ExtracurricularChooser = (props: ECchooserProps) => {
    return (
        <div>
            {props.exracurriculars.map(ec => {
                                        return <div 
                                        className = "ec-item" 
                                        key={ec._id}
                                        onClick = {(e: any) => {
                                            if (e.target.className === "ec-item") {
                                                e.target.className = "ec-item-selected"
                                                props.handleUpdate(ec)
                                            }
                                            else {
                                                e.target.className = "ec-item"
                                                props.handleUpdate(ec)
                                            }

                                        }}>{ec.name}</div>
                                        })}
        </div>
    )
}


// function getECItemClass(selected: Extracurricular[], item: Extracurricular) {
//     if (selected.includes(item)) return "ec-item-selected"
//     else return "ec-item"
// }

export default ExtracurricularChooser