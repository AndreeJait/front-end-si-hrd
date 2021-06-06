import React from 'react'
import './index.css'
const SelectLabel = (props)=>{
    const handleChangeSelect = (event)=>{
        props.onChange(event)
    }
    return(
        <div className="select-label">
            <label htmlFor={props.id}>{props.label}</label>
            <select data-temp={props.data} onChange={handleChangeSelect} name={props.name} id={props.id} defaultValue={props.option[0].value}>
                {
                    props.option.map((item, index)=>{
                        return <option 
                            selected={(props.value === item.text || props.value === item.value )? true : null } key={index + 1} value={item.value ? item.value : item.text} disabled={item.disabled ? true : null}>{item.text}</option>
                    })
                }
            </select>
            <small  id={ props.id+"-error"} className={"error-msg"}>{props.label} tidak boleh kosong</small>
        </div>
    )
}

export default SelectLabel