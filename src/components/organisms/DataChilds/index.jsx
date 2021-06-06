import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataChilds = (props) => {
    const handleOnAdd = (event) => {
        props.addCard();
    }
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    const handleOnDelete = (event) => {
        props.onDelete(event)
    }
    return (
        <div className="data-childs">
            <h5>Data Anak</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Anak</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                            <InputLabel data={index} onChange={handleOnChange} label="Nama Anak" name={"nama_anak"} id={"nama_anak" + index} value={props.data[index].nama_anak} placeholder="Masa Kerja"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Tempat Lahir" name={"tempat_lahir_anak"} id={"tempat_lahir_anak" + index} value={props.data[index].tempat_lahir_anak} placeholder="Tempat Lahir"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Tanggal Lahir" type="date" name={"tanggal_lahir_anak"} id={"tanggal_lahir_anak" + index}
                                value={(new Date(props.data[index].tanggal_lahir_anak)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })} placeholder="Tanggal Masuk"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>
    );
}

export default DataChilds;