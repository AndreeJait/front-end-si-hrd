import React from 'react'
import './index.css'
const CardData = (props)=>{
    const handleOnDelete = (event)=>{
        props.onDelete(event);
    }
    return(
        <div className="card-data">
            <div className="header-card">
                <h6>{props.header}</h6>
                <button data-index={props.data} onClick={handleOnDelete} className="btn btn-danger ml-auto">Hapus</button>
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default CardData