import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataJabatan = (props)=>{
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
            <h5>History Jabatan</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Jabatan</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                            <InputLabel data={index} onChange={handleOnChange} label="Jabatan Struktural" name={"jabatan_struktural"} id={"jabatan_struktural" + index} value={props.data[index].jabatan_struktural} placeholder="Jabatan Struktural"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Jabatan Fungsional" name={"jabatan_fungsional"} id={"jabatan_fungsional" + index} value={props.data[index].jabatan_fungsional} placeholder="Jabatan Fungsional"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="No SK Jabatan Fungsional" name={"no_sk_jabatan_fungsional"} id={"no_sk_jabatan_fungsional"+ index} value={props.data[index].no_sk_jabatan_fungsional} placeholder="No SK Jabatan Fungsional"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="JFD Kum" name={"jfd_kum"} id={"jfd_kum"+ index} value={props.data[index].jfd_kum} placeholder="JFD Kum"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Terhitung Mulai Tanggal" type="date" name={"tmt"} id={"tmt" + index} 
                                value={(new Date(props.data[index].tmt)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})}></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>  
    );
}

export default DataJabatan;