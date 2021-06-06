import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataKontrak = (props)=>{
    const handleOnAdd = (event) => {
        props.addKontrak();
    }
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    const handleOnDelete = (event)=>{
        props.onDelete(event)
    }
    return(
        <div className="data-kontrak">
            <h5>History Kontrak</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Kontrak</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                            <InputLabel data={index} onChange={handleOnChange} label="Keterangan" name={"keterangan"} id={"keterangan" + index} value={props.data[index].keterangan} placeholder="Keterangan"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Tanggal Mulai" type="date" name={"tanggal_mulai"} id={"tanggal_mulai" + index} 
                                value={(new Date(props.data[index].tanggal_mulai)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Mulai"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Tanggal Berakhir" type="date" name={"tanggal_berakhir"} id={"tanggal_berakhir" + index} 
                                value={(new Date(props.data[index].tanggal_berakhir)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Berakhir"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>
    );
}

export default DataKontrak;