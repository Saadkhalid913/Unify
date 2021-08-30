import React from 'react'
import { Extracurricular } from "./ApplicationsPage"


interface ECchooserProps {
    exracurriculars: Extracurricular[]
}

const ExtracurricularChooser = (props: ECchooserProps) => {
    console.log(props.exracurriculars)
    return <div>Hello</div>
}

export default ExtracurricularChooser