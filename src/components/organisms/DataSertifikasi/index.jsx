import React from 'react';
import './index.css';
import InputLabel from '../../atoms/InputLabel';

const DataSertifikasi = (props) => {
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    return (
        <div className="data-masa-kerja">
            <h5>Detail Sertifikasi</h5>
            <div className="data-row">
                <div className="item-row">
                    <InputLabel onChange={handleOnChange} label="Tanggal Sertifikasi" type="date" name={"tanggal_sertifikasi"} id={"tanggal_sertifikasi"}
                        value={(new Date(props.data.tanggal_sertifikasi)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })}></InputLabel>
                    <InputLabel onChange={handleOnChange} label="Nomor Sertifikasi" name={"nomor_sertifikasi"} id={"nomor_sertifikasi"} value={props.data.nomor_sertifikasi} placeholder="No Sertifikasi"></InputLabel>
                </div>
            </div>
        </div>
    );
}

export default DataSertifikasi;