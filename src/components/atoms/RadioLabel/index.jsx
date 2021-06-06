import React from 'react'
import './index.css'
const RadioLabel = (props) => {
    const handleOnChange = (event)=>{
        props.onChange(event)
    }
    return (
        <div className="radio-label">
            <label htmlFor={props.id}>{props.label}</label>
            <div className="radio-choice">
                {props.choice.map((item, index)=>{
                    return <label key={index} htmlFor={item + "choice"}>
                        <input checked={props.value === item ? true : null} data-temp={props.data} onChange={handleOnChange} type="radio" name={props.name} id={item + "choice"} value={item} /> {item}
                    </label>
                })}
            </div>
        </div>
    )
}

export default RadioLabel