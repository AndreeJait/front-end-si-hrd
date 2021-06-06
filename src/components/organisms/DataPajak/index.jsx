import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataPajak = (props) => {
    const handleOnAdd = (event) => {
        props.addTax();
    }
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    const handleOnDelete = (event)=>{
        props.onDelete(event)
    }
    return (
        <div className="data-pajak">
            <h5>History Pajak</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Pajak</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                            <InputLabel data={index} onChange={handleOnChange} label="Status Pajak" name={"status_pajak"} id={"status_pajak" + index} value={props.data[index].status_pajak} placeholder="Status Pajak"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Tanggal NPWP" type="date" name={"tanggal_npwp"} id={"tanggal_npwp" + index} 
                                value={(new Date(props.data[index].tanggal_npwp)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Status Pajak"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Alamat NPWP" name={"alamat_npwp"} id={"alamat_npwp" + index} value={props.data[index].alamat_npwp} placeholder="Alamat NPWP"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="NPWP" name={"npwp"} id={"npwp"+ index} value={props.data[index].npwp} placeholder="NPWP"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>
    );
};
export default DataPajak;