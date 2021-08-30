import React, {ChangeEvent} from 'react'


export interface FormInputProps {
    name: string;
    type: string;
    onChange: Function
}

const FormInput = (props: FormInputProps) => {
    const {name, type, onChange} = props
    return (
        <div className = "form-input">
            <label htmlFor={name} >{name}</label>
            <input type = {type} name = {name} onChange={(e: ChangeEvent<HTMLInputElement>) : any => {
                if (type === "date") return onChange(Date.parse(e.target.value))
                else return onChange(e.target.value)
            }
        } /> 
        </div>

    ) 
}

export default FormInput
