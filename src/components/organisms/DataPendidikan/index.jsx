import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';
import {useHistory} from 'react-router';

const DataPendidikan = (props)=>{
    const history = useHistory()
    const handleOnAdd = (event) => {
        props.addCard();
    }
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    const handleOnDelete = (event)=>{
        props.onDelete(event)
    }
    const handleOnClick = (event)=>{
        localStorage.removeItem("last_inserted")
        history.push("/dosen")
    }
    return(
        <div className="data-masa-kerja">
            <h5>History Pendidikan</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Pendidikan</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                              <InputLabel data={index} onChange={handleOnChange} label="Tanggal Masuk" type="date" name={"tanggal_masuk"} id={"tanggal_masuk" + index} 
                                value={(new Date(props.data[index].tanggal_masuk)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Masuk"></InputLabel>
                              <InputLabel data={index} onChange={handleOnChange} label="Tanggal Lulus" type="date" name={"tanggal_berakhir"} id={"tanggal_berakhir" + index} 
                                value={(new Date(props.data[index].tanggal_berakhir)).toLocaleString("en-CA", {timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month:"2-digit"})} placeholder="Tanggal Lulus"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Instansi" name={"instansi"} id={"instansi" + index} value={props.data[index].instansi} placeholder="Instansi"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Nama Pendidikan" name={"nama_pendidikan"} id={"nama_pendidikan" + index} value={props.data[index].nama_pendidikan} placeholder="Nama Pendidikan"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Jurusan" name={"jurusan"} id={"jurusan" + index} value={props.data[index].jurusan} placeholder="Jurusan"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Nilai" name={"nilai"} id={"nilai"+ index} value={props.data[index].nilai} placeholder="Nilai"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
            <div className="button-end mt-2">
                <button onClick={props.onSend} className="btn btn-success button-rounded"> <i className="fas fa-check"></i> Simpan </button>
                <button onClick={handleOnClick} className="btn btn-danger button-rounded ml-auto"> <i className="fas fa-times"></i> Tutup Perubahan</button>
            </div>
        </div>  
    );
}

export default DataPendidikan;