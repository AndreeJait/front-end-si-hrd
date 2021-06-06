import React, { useState } from 'react'
import './index.css'

const ModalBox = (props) =>{
    const [buttons] = useState(props.buttons);
    const handleCancelModal = (event) =>{
        document.getElementById(props.target).classList.remove("active")
    }
    return(
        <div className="modal-box" id={props.target}>
            <div className="header-modal">
                <h4>{props.title}</h4>
            </div>
            <div className="body-modal">
                {props.children}
            </div>
            <div className="footer-modal">
                {   
                    buttons.map((item, index)=>{
                        return <button key={index} onClick={item[3]} className={item[0]}>{item[1] !== "no" && <i className={item[1]}></i>} {item[2]}</button>
                    })
                }
                <button onClick={handleCancelModal} className="btn btn-danger ml-auto"> <i className="fas fa-times"></i> Cancel</button>
            </div>
        </div>
    )
}

export default ModalBox