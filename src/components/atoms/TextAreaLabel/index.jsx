import React from 'react'
import './index.css'

const TextAreaLabel = (props)=>{
    const handleOnChange = (event)=>{
        props.onChange(event)
    }
    return(
        <div className="text-area-label">
            <label htmlFor={props.id}>{props.label}</label><br />
            <textarea data-temp={props.data} placeholder={props.placeholder} onChange={handleOnChange} name={props.name} id={props.id} cols="30" value={props.value} rows="10"></textarea>
            <small id={ props.id+"-error"} className={"error-msg"}>{props.label} tidak boleh kosong</small>
        </div>
    )
}

export default TextAreaLabel