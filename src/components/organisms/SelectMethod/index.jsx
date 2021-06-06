import React from 'react';
import './index.css';

const SelectMethod = (props) => {
    const handleClick = (event)=>{
        let stage = Number(event.currentTarget.getAttribute("data-stage"));
        let page = 1;
        let child_page
        if(stage === 1){
            child_page = 0;
        }else{
            child_page = 1;
        }
        props.changePageStage(page,stage,child_page)
    }
    return (
        <div className="select-method">
            <h5>Tambahkan Data Pegawai</h5>
            <small>Silahkan pilih diantara kedua cara dibawah untuk menambahkan data pegawai baru.</small><br />
            <small>Anda dapat melihat penjelsan kedua cara tersebut pada about method.</small>
            <div className="method-button">
                <button onClick={handleClick} data-stage="2" className="btn btn-primary"> <i className="fas fa-plus-square"></i> Isi Form Data</button>
                <button onClick={handleClick} data-stage="1" className="btn btn-primary"> <i className="fas fa-file-excel"></i> Upload File Excel</button>
            </div>
        </div>
    );
}

export default SelectMethod;