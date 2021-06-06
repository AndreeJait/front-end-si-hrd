import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataPangkat = (props)=>{
    const handleOnAdd = (event) => {
        props.addCard();
    }
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    const handleOnDelete = (event)=>{
        props.onDelete(event)
    }
    return(
        <div className="data-masa-kerja">
            <h5>History Golongan/Pangkat</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Golongan/Pangkat</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                              <InputLabel data={index} onChange={handleOnChange} label="Terhitung Mulai Tanggal" type="date" name={"tmt"} id={"tmt" + index} 
                                value={(new Date(props.data[index].tmt)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Masuk"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Pangkat In Passing" name={"pangkat_inpassing"} id={"pangkat_inpassing" + index} value={props.data[index].pangkat_inpassing} placeholder="Pangkat Inpassing"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Golongan" name={"golongan"} id={"golongan" + index} value={props.data[index].golongan} placeholder="Golongan"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="No SK Inpassing" name={"no_sk_inpassing"} id={"no_sk_inpassing"+ index} value={props.data[index].no_sk_inpassing} placeholder="No SK Inpassing"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>  
    );
}

export default DataPangkat;