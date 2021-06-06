import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataMasaKerja = (props)=>{
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
            <h5>History Masa Kerja</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Masa kerja</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                              <InputLabel data={index} onChange={handleOnChange} label="Tanggal Masuk" type="date" name={"tanggal_masuk"} id={"tanggal_masuk" + index} 
                                value={(new Date(props.data[index].tanggal_masuk)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Masuk"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Masa Kerja" name={"masa_kerja"} id={"masa_kerja" + index} value={props.data[index].masa_kerja} placeholder="Masa Kerja"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Aktif/TSDP" name={"aktif_tsdp"} id={"aktif_tsdp" + index} value={props.data[index].aktif_tsdp} placeholder="Aktif/TSDP"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Keterangan" name={"keterangan"} id={"keterangan"+ index} value={props.data[index].keterangan} placeholder="Keterangan"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>  
    );
}

export default DataMasaKerja;