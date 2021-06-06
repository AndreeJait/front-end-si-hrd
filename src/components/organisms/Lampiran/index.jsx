import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { APIBASE } from '../../../config/constants';
import { actionDeleteLampiran, actionUploadEmployeeProfileLink, actionUploadEmployeeProfileUpload, actionUploadLampiranLink, actionUploadLampiranUpload } from '../../../config/redux/action';
import './index.css';

const Lampiran = (props) => {
    const history = useHistory()
    const [source, setSource] = useState(axios.CancelToken.source())
    const [profileType, setProfileType] = useState("upload")
    const [lampiranType, setLampiranType] = useState("upload")
    const [profile, setProfile] = useState("")
    const [field, setField] = useState({
        link: "",
        file_name: "",
        file_type: "",
        save_method: "",
        file: null
    })
    const handleChangeTypeProfile = (event) => {
        let type = event.currentTarget.getAttribute("data-type");
        setProfileType(type);
    }
    const handleChangeTypeLampiran = (event) => {
        let type = event.currentTarget.getAttribute("data-type");
        setLampiranType(type);
    }
    const handleOnInputLink = (event) => {
        setProfile(event.currentTarget.value)
    }
    const handleOnChangeUploadImg = (event) => {
        setProfile(event.currentTarget.files[0])
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            document.getElementById("profile").src = e.target.result
        }
        fileReader.readAsDataURL(event.currentTarget.files[0])
    }
    const handleOnSubmitProfile = (event) => {
        if (profileType === "link") {
            let data = {
                _id: props.data._id,
                link: profile
            }
            props.changeProfileLink(data, source.token)
                .then(result => {
                    document.getElementById("profile").src = profile
                    setSource(axios.CancelToken.source())
                    let dosen = props.data
                    dosen.private_data.foto_diri = profile
                    props.changeDosen(dosen);
                }).catch(err => {
                    alert("Failed to change profile.")
                    setSource(axios.CancelToken.source())
                });
        } else {
            let formData = new FormData()
            formData.append("_id", props.data._id);
            formData.append("profile", profile);
            props.changeProfileUpload(formData, source.token)
                .then(result => {
                    setSource(axios.CancelToken.source())
                    let dosen = props.data
                    dosen.private_data.foto_diri = result.profile
                    props.changeDosen(dosen);
                }).catch(err => {
                    alert("Failed to change profile.")
                    setSource(axios.CancelToken.source())
                })
        }
    }
    const handleChangeInputLampiran = (event) => {
        let temp = { ...field }
        temp[event.currentTarget.name] = event.currentTarget.value
        temp.save_method = lampiranType
        setField(temp);
    }
    const handleChangeFileLampiran = (event) => {
        let temp = { ...field }
        let file = event.currentTarget.files[0]
        temp.file = file
        temp.save_method = lampiranType
        setField(temp);
    }
    const handleOnClickSelesai = (event) => {
        localStorage.removeItem("last_inserted")
        history.push("/dosen")
    }

    const handleAddLampiran = (event) => {
        if (lampiranType === "upload") {
            let formData = new FormData()
            formData.append("_id", props.data._id);
            formData.append("file", field.file);
            formData.append("file_name", field.file_name);
            formData.append("file_type", field.file_type);
            props.addLampiranUpload(formData, source.token)
                .then(result => {
                    let lampiran = {
                        file_name: field.file_name,
                        file_type: field.file_type,
                        link: result.link,
                        save_method: "upload"
                    }
                    let dosen = props.data
                    dosen.lampiran.push(lampiran);
                    setSource(axios.CancelToken.source())
                    props.changeDosen(dosen);
                }).catch(err => {
                    setSource(axios.CancelToken.source())
                });
        } else {
            let new_field = {};
            new_field["_id"] = props.data._id;
            new_field["lampiran"] = field
            props.addLampiranLink(new_field, source.token)
                .then(result => {
                    let lampiran = {
                        file_name: field.file_name,
                        file_type: field.file_type,
                        link: field.link,
                        save_method: field.save_method
                    }
                    let dosen = props.data
                    dosen.lampiran.push(lampiran);
                    props.changeDosen(dosen);
                    setSource(axios.CancelToken.source())
                }).catch(err => {
                    setSource(axios.CancelToken.source())
                })
        }
    }
    const handleDeleteLampiran = (event) => {
        let data = JSON.parse(event.currentTarget.getAttribute("data-temp"))
        data["_id"] = props.data._id
        props.deleteLampiran(data, source.token)
            .then(result=>{
                let dosen = props.data
                let find = dosen.lampiran.findIndex((item)=>{
                    return item.file_name === data.file_name && item.file_type === data.file_type && item.link === data.link
                })
                dosen.lampiran.splice(find, 1);
                props.changeDosen(dosen);
                setSource(axios.CancelToken.source())
            }).catch(err=>{
                alert("Gagal menghapus")
                setSource(axios.CancelToken.source())
            });
    }
    return (
        <div className="lampiran">
            <h5>Foto Diri Pegawai</h5>
            <div className="lampiran-profile">
                <div className="foto_diri_dosen">
                    <img id="profile" src={props.data.private_data.foto_diri.search("upload") === 0 ? (APIBASE + props.data.private_data.foto_diri) : props.data.private_data.foto_diri} alt="Preview" />
                </div>
                <div className="input-file">
                    <div className="radio-choice">
                        <label htmlFor="profType1"><input onClick={handleChangeTypeProfile} data-type="upload" type="radio" name="profType" id="profType1" /> Upload</label>
                        <label htmlFor="profType2"><input onClick={handleChangeTypeProfile} data-type="link" type="radio" name="profType" id="profType2" /> Link</label>
                    </div>
                    {profileType === "upload" && <input onChange={handleOnChangeUploadImg} type="file" name="profile" id="profile" />}
                    {profileType === "link" && (
                        <div className="input-file-link">
                            <label htmlFor="">Link File</label>
                            <input onChange={handleOnInputLink} value={profile} type="text" name="profile" id="profile" />
                        </div>
                    )}
                    <button onClick={handleOnSubmitProfile} className="btn btn-primary button-rounded"> <i className="fas fa-edit"></i> Change Profile</button>
                </div>
            </div>
            <div className="lampiran-file">
                <h5>Semua Lampiran</h5>
                <div className="row-file">
                    {props.data.lampiran.map((item, index) => {
                        return (
                            <div key={index} className="item-file">
                                {item.file_type.toLowerCase() === "image" && (
                                    item.save_method.toLowerCase() === "link" ? <img src={item.link} alt="" /> : <img src={APIBASE + item.link} alt="" />
                                )}
                                {item.file_type.toLowerCase() === "pdf" && (
                                    <i className="fas fa-file-pdf file"></i>
                                )}
                                {item.file_type.toLowerCase() !== "image" && item.file_type.toLowerCase() !== "pdf" && (
                                    <i className="fas fa-file-alt file"></i>
                                )}
                                <div className="temp mt-2">
                                    <a rel="noreferrer" target="_blank" href={item.save_method.toLowerCase() === "link" ? item.link : APIBASE + item.link}>{item.file_name}</a>
                                </div>
                                <div className="input-config">
                                    <button data-temp={JSON.stringify(item)} onClick={handleDeleteLampiran} className="btn btn-danger button-rounded"><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="upload-file">
                    <h5>Tambahkan Lampiran</h5>
                    <div className="radio-choice">
                        <label htmlFor="profType3"><input onClick={handleChangeTypeLampiran} data-type="upload" type="radio" name="profType1" id="profType3" /> Upload</label>
                        <label htmlFor="profType4"><input onClick={handleChangeTypeLampiran} data-type="link" type="radio" name="profType1" id="profType4" /> Link</label>
                    </div>
                    {lampiranType === "upload" && (
                        <input onChange={handleChangeFileLampiran} type="file" name="link" id="link" />
                    )}
                    {lampiranType === "link" && (
                        <div className="input-file-link">
                            <label htmlFor="">Link File</label>
                            <input onChange={handleChangeInputLampiran} value={field.link} type="text" name="link" id="link" />
                        </div>
                    )}
                    <div className="input-file-link">
                        <label htmlFor="">File Type</label>
                        <input onChange={handleChangeInputLampiran} value={field.file_type} type="text" name="file_type" id="file_type" />
                    </div>
                    <div className="input-file-link">
                        <label htmlFor="">File Name</label>
                        <input onChange={handleChangeInputLampiran} value={field.file_name} type="text" name="file_name" id="file_name" />
                    </div>
                    <button onClick={handleAddLampiran} className="btn btn-success button-rounded"> <i className="fas fa-plus"></i> Tambahkan Lampiran</button>
                </div>
                <button onClick={handleOnClickSelesai} className="float-right btn btn-danger button-rounded"> <i className="fas fa-times"></i> Tutup Perubahan</button>
            </div>
        </div>
    )
}
const reduxState = (state) => (
    {
        isLogin: state.isLogin,
        notif: state.notif,
        token: state.token,
        user: state.user,
        dosen_edited: state.dosen_edited
    }
)
const reduxDispatch = (dispatch) => ({
    changeProfileLink: (data, cancelToken) => dispatch(actionUploadEmployeeProfileLink(data, cancelToken)),
    changeProfileUpload: (data, cancelToken) => dispatch(actionUploadEmployeeProfileUpload(data, cancelToken)),
    addLampiranLink: (data, cancelToken) => dispatch(actionUploadLampiranLink(data, cancelToken)),
    addLampiranUpload: (data, cancelToken) => (dispatch(actionUploadLampiranUpload(data, cancelToken))),
    deleteLampiran: (data, cancelToken) =>dispatch(actionDeleteLampiran(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(Lampiran);