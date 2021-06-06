import React, { useState } from 'react'
import './index.css'
const InputCustom = (props) => {
    const [msgerror, setMessageError] = useState("")
    const valueAuto = props.autoComplete ? props.autoComplete : "no" 
    const [autoComplete] =  useState(valueAuto)
    const tempValue = props.value ? props.value : ""
    const [valueInput, setValueInput] = useState(tempValue)
    const handleChange = (event) => {
        let valid = false
        let validate = props.validate.split(",")
        const temp = document.getElementById("holder" + event.currentTarget.name)
        const lbl = document.getElementById("lbl" + event.currentTarget.name)
        lbl.classList.add("active")
        var mailFormat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(event.currentTarget.value.length === 0 && validate[0] === "yes"){
            temp.classList.add("error")
            setMessageError(props.text + " tidak boleh kosong !")
        }else if(!event.currentTarget.value.match(mailFormat) && event.currentTarget.type === "email"){
            temp.classList.add("error")
            setMessageError("Format email tidak benar !")
        }else if(event.currentTarget.value.length < 8 && validate[1] === "yes"){
            temp.classList.add("error")
            setMessageError(props.text + "t erlalu pendek !")
        }
        else{
            temp.classList.remove("error")
            setMessageError("")
            valid = true
        }
        setValueInput(event.currentTarget.value)
        var result = {
            name : props.name,
            value: event.currentTarget.value,
            valid : valid 
        }
        props.onChange(result)
    }
    const handleBlur = (event) => {
        const temp = document.getElementById("holder" + event.currentTarget.name)
        const lbl = document.getElementById("lbl" + event.currentTarget.name)
        var mailFormat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let validate = props.validate.split(",")
        if(event.currentTarget.value.length === 0 && validate[0] === "yes"){
            temp.classList.add("error")
            lbl.classList.remove("active")
            setMessageError(props.text + " tidak boleh kosong !")
        }else if(!event.currentTarget.value.match(mailFormat) && event.currentTarget.type === "email"){
            temp.classList.add("error")
            setMessageError("Format email tidak benar !")
        }else if(event.currentTarget.value.length < 8  && validate[1] === "yes"){
            temp.classList.add("error")
            setMessageError(props.text + " terlalu pendek !")
        }
        else{
            temp.classList.remove("error")
            setMessageError("")
        }
    }
    const handleShowPassowrd= (event) => {
        if(event.currentTarget.checked){
            document.getElementById(props.name).type = "text"
        }else{
            document.getElementById(props.name).type = "password"
        }
    }
    return (
        <div id={"holder" + props.name} >
            <div className="input-group">
                <label htmlFor={props.name} id={'lbl' + props.name}>{props.text}</label>
                <input value={valueInput} autoComplete={autoComplete === "yes" ? "off" : "on"} onBlur={handleBlur} onChange={handleChange} type={props.type}
                    name={props.name} id={props.name} placeholder={props.text} required />
            </div>
            <p className="msg-error">{msgerror}</p>
            {props.type === "password" &&  <label htmlFor="show-password" className="font-label"><input onChange={handleShowPassowrd} type="checkbox" name="show-passowrd" id="show-password"/> Tampilkan Password</label>}
        </div>
    )
}
export default InputCustom