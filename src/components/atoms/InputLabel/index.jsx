import React from 'react'
import './index.css'
const InputLabel = (props)=>{
    const handleChangeInput = (event)=>{
        props.onChange(event)
    }
    return(
        <div className="input-label">
            <label htmlFor={props.id}>{props.label}</label>
            <input data-temp={props.data} onChange={handleChangeInput} type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} value={props.value} />
            <small id={ props.id+"-error"} className={" error-msg"}>{props.label} tidak boleh kosong</small>
        </div>
    )
}
export default InputLabel
