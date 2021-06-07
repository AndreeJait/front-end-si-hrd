import React, { useState } from 'react';
import xlxs from 'xlsx';
import './index.css';
import loading from '../../../assets/img/icon/loading-button.gif';
import { connect } from 'react-redux';
import { actionaddDataPegawaiAPI } from '../../../config/redux/action';
import excel from '../../../assets/docs/data_input_example.xlsx'
import axios from 'axios';

const ImportExcel = (props) => {
    const [file, setFile] = useState(null);
    const [count, setCount] = useState(0);
    const [countUpload, setCountUpload] = useState(0);
    const [isTake, setTake] = useState(0);
    const [isDone, setDone] = useState(0);
    const [source, setSource] = useState(axios.CancelToken.source())
    const [isUpload, setUpload] = useState(0);
    const [isArray] = useState(["tax_details", "contrats", "years_of_service", "unpaid_history", "childs", "positions", "ratings", "education_histories", "lampiran"])
    const handleOnClick = (event) => {
        event.currentTarget.parentNode.querySelector("input").click()
    }
    const handleOnChange = (event) => {
        if (event.currentTarget.files[0] !== undefined) {
            event.currentTarget.parentNode.querySelector("label").innerHTML = event.currentTarget.files[0].name;
            setFile(event.currentTarget.files[0])
        }
    }
    const handleOnUpload = (event) => {
        if (file !== null) {
            let loader = document.getElementsByClassName("task-list")[0];
            loader.classList.add("active")
            let fileReader = new FileReader();
            setTake(0);
            setUpload(0);
            setDone(0);
            fileReader.onload = (e) => {
                let wb = xlxs.read(e.target.result, { type: "binary", cellDates: true });
                let sheets = wb.SheetNames;
                let pegawais = []
                let private_data = xlxs.utils.sheet_to_json(wb.Sheets[sheets[0]]);
                private_data.forEach(item => {
                    let pegawai = {}
                    pegawai[sheets[0]] = item
                    pegawais.push(pegawai)
                })
                let group = {}
                for (let index = 1; index < sheets.length; index++) {
                    const element = sheets[index];
                    let temp = {}
                    let data = xlxs.utils.sheet_to_json(wb.Sheets[element]);
                    data.forEach(item => {
                        if (temp[item.nip] !== undefined && isArray.includes(element)) {
                            let nip = item.nip
                            delete item.nip
                            temp[nip].push(item)
                        } else {
                            let nip = item.nip
                            delete item.nip
                            if (isArray.includes(element)) {
                                temp[nip] = [item];
                            } else {
                                temp[nip] = item
                            }
                        }
                    })
                    group[element] = temp
                }
                pegawais.forEach(item => {
                    for (let index = 1; index < sheets.length; index++) {
                        const element = sheets[index];
                        if (group[element][String(item.private_data.nip)]) {
                            item[element] = group[element][String(item.private_data.nip)];
                        } else {
                            if (isArray.includes(element)) {
                                item[element] = [];
                            } else {
                                item[element] = null
                            }
                        }
                    }
                });
                setCount(pegawais.length);
                if (pegawais.length < 1) {
                    setTake(0);
                    setUpload(0);
                    setDone(1);
                    document.getElementById("error-upload").classList.add("active")
                    document.getElementById("error-upload").innerHTML = "Tidak ada data ditemukan."
                } else {
                    setTake(1);
                    loader.querySelector("img").classList.add("active")
                    props.actionAddPegawai(pegawais, source.token)
                        .then(result => {
                            document.getElementById("error-upload").classList.remove("active");
                            document.getElementById("succes-upload").classList.add("active");
                            document.getElementById("file").files = null;
                            document.getElementById("file").parentNode.querySelector("label").innerHTML = "No File Choosen"
                            setCountUpload(result.result.length);
                            setUpload(1);
                            setDone(1);
                            setSource(axios.CancelToken.source());
                        }).catch(err => {
                            document.getElementById("succes-upload").classList.remove("active");
                            document.getElementById("error-upload").classList.add("active");
                            document.getElementById("error-upload").innerHTML = "Data Sudah ada di dalam database.";
                            setCountUpload(0);
                            setUpload(0);
                            setDone(1);
                            setSource(axios.CancelToken.source());
                        });
                }

            }
            fileReader.readAsBinaryString(file);
        }
    }
    return (
        <div className="import-excel">
            <h5>Tambahkan Data Pegawai Baru dengan Excel</h5>
            <small>Anda dapat mengunduh format excel  <a rel="noreferrer" target="_blank" href={excel}> Disini</a></small>
            <div className="input-file-excel">
                <label htmlFor="">Pilih file anda</label>
                <div className="input-file-custom">
                    <label htmlFor="file">No File Choosen</label>
                    <button onClick={handleOnClick} className="btn"> <i className="fas fa-file-excel"></i> Choose file</button>
                    <input onChange={handleOnChange} type="file" name="file" id="file" />
                </div>
                <button onClick={handleOnUpload} className="btn btn-success mt-2 button-rounded"> <i className="fas fa-plus"></i> Tambahkan Pegawai</button>
            </div>
            <div className="task-list">
                {!isDone && (<img src={loading} alt="" />)}
                <ul>
                    <li>Proses {count} data pegawai {isTake ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>} </li>
                    <li>Upload {countUpload} data pegawai to database {isUpload ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>} </li>
                </ul>
            </div>
            <p id="error-upload" className="">Test</p>
            <p id="succes-upload" className="">Berhasil menambahkan {countUpload} data pegawai.</p>
        </div>
    )
}
const reduxState = (state) => (
    {

    }
)
const reduxDispatch = (dispatch) => ({
    actionAddPegawai: (data, cancelToken) => dispatch(actionaddDataPegawaiAPI(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(ImportExcel);