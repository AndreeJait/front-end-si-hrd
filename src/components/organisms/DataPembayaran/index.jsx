import React from 'react';
import './index.css';
import InputLabel from '../../atoms/InputLabel';

const DataPembayaran = (props) => {
    const handleOnChange = (event) => {
        props.onChange(event);
    }
    return (
        <div className="data-masa-kerja">
            <h5>Detail Bank</h5>
            <div className="data-row">
                <div className="item-row">
                    <InputLabel  onChange={handleOnChange} label="Bank Transfer" name={"bank_transfer"} id={"bank_transfer"} value={props.data.bank_transfer} placeholder="BANK Transfer"></InputLabel>
                    <InputLabel  onChange={handleOnChange} label="Cabang" name={"cabang"} id={"cabang"} value={props.data.cabang} placeholder="Cabang"></InputLabel>
                    <InputLabel  onChange={handleOnChange} label="Pemilik Akun" name={"account_holder"} id={"account_holder"} value={props.data.account_holder} placeholder="Pemilik Akun"></InputLabel>
                    <InputLabel  onChange={handleOnChange} label="No Rekening" name={"no_rekening"} id={"no_rekening"} value={props.data.no_rekening} placeholder="No Rekening"></InputLabel>
                </div>
            </div>
        </div>
    );
}

export default DataPembayaran;