import React from 'react';
import InputLabel from '../../atoms/InputLabel';
import './index.css';

const DataPegawai = (props) => {
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    return (
        <div className="data-pegawai">
            <h3>Detail Pegawai</h3>
            <div className="data-row">
                <div className="item-row">
                    <InputLabel onChange={handleOnChange} label="Kode" name="kode" id="kode" placeholder="Kode" value={props.data.kode}></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Klasifikasi" name="klasifikasi" id="klasifikasi" placeholder="Klasifikasi" value={props.data.klasifikasi} ></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Prodi" name="prodi" id="prodi" placeholder="Prodi" value={props.data.prodi}></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Fakultas" name="fakultas" id="fakultas" placeholder="Fakultas" value={props.data.fakultas} ></InputLabel>
                </div>
                <div className="item-row">
                    <InputLabel onChange={handleOnChange} label="Tanggal Masuk" type="date" name={"tanggal_masuk"} id={"tanggal_masuk"}
                        value={(new Date(props.data.tanggal_masuk)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })}></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Tanggal Keluar" type="date" name={"tanggal_keluar"} id={"tanggal_keluar"}
                        value={(new Date(props.data.tanggal_keluar)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })}></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Status" name="status" id="status" placeholder="Status" value={props.data.status}></InputLabel>
                </div>
            </div>
        </div>
    )
};
export default DataPegawai;