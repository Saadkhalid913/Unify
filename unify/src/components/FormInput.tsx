import React, {ChangeEvent} from 'react'


export interface FormInputProps {
    name: string;
    type: string;
    onChange: Function
}

const FormInput = (props: FormInputProps) => {
    const {name, type, onChange} = props
    return <input type = {type} name = {name} onChange={(e: ChangeEvent<HTMLInputElement>) : any => onChange(e.target.value)} />  
}

export default FormInput
