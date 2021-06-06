import React from 'react';
import './index.css';
import CardData from '../../molekuls/CardData';
import InputLabel from '../../atoms/InputLabel';

const DataUnpaid = (props) => {
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
        <div className="data-unpaid">
            <h5>History Unpaid</h5>
            <button onClick={handleOnAdd} className="btn btn-primary button-rounded mt-2" > <i className="fas fa-plus"></i> Tambahkan Data Unpaid</button>
            <div className="data-row mt-2">
                {Array.isArray(props.data) && props.data.map((item, index) => {
                    return (
                        <CardData onDelete={handleOnDelete} data={index} key={index} header="Data Pajak">
                            <InputLabel data={index} onChange={handleOnChange} label="Awak Unpaid" type="date" name={"awal_unpaid"} id={"awal_unpaid" + index}
                                value={(new Date(props.data[index].awal_unpaid)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })} placeholder="Tanggal Masuk"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Akhir Unpaid" type="date" name={"akhir_unpaid"} id={"akhir_unpaid" + index}
                                value={(new Date(props.data[index].akhir_unpaid)).toLocaleString("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", day: "2-digit", month: "2-digit" })} placeholder="Tanggal Masuk"></InputLabel>
                            <InputLabel data={index} onChange={handleOnChange} label="Jumlah Hari" name={"jumlah_hari"} id={"jumlah_hari" + index} value={props.data[index].jumlah_hari} placeholder="Jumlah Hari"></InputLabel>
                        </CardData>
                    );
                })}
            </div>
        </div>
    );
}

export default DataUnpaid;