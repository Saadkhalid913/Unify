import React from 'react'

const BackButton = (props: {onClick: () => void}) => {
   return (
    <button onClick = {props.onClick}className = "back-button">
    Back
    </button>
   )
}

export default BackButton