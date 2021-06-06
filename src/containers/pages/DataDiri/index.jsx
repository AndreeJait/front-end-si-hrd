import { Component, React } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { connect } from 'react-redux';
import { actionChangePorfileUser, actionChangeProfileDefault, actionUpdate } from '../../../config/redux/action'
import Loading from '../Loading';
import axios from 'axios';
class DataDiri extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: localStorage.getItem("isLogin") ? JSON.parse(localStorage.getItem("isLogin")).user : {},
            fieldInput: {
                full_name: "",
                private_email: "",
                phone_number: ""
            },
            image: null
        }
        this.source = axios.CancelToken.source()
    }
    componentDidMount() {
        let name = this.state.users.full_name;
        let email_pribadi = this.state.users.private_email;
        let no_telepon = this.state.users.phone_number;
        // console.log(name)
        this.setState({
            fieldInput: {
                full_name: name,
                private_email: email_pribadi,
                phone_number: no_telepon
            }
        });
    }
    handleTriggerFile = () => {
        let file = document.getElementById("file")
        file.click()
    }
    handleOnInput = (event) => {
        if (event.currentTarget.files[0] !== undefined) {
            document.getElementsByClassName("setting-change-profile")[0].classList.add("active")
            document.getElementById("temp-file-name").innerHTML = "File Name : " + event.currentTarget.files[0].name
            let reader = new FileReader()
            reader.onload = ()=>{
                document.getElementById("profile-preview").src = reader.result;
            }
            reader.readAsDataURL(event.currentTarget.files[0])

            this.setState({
                image: event.currentTarget.files[0]
            })
        }
    }
    handleChange = (event) => {
        let temp = this.state.fieldInput
        temp[event.currentTarget.name] = event.currentTarget.value
        this.setState({
            fieldInput: temp
        })
    }
    handleCancelChangeImg = (event)=>{
        document.getElementsByClassName("setting-change-profile")[0].classList.remove("active")
        document.getElementById("profile-preview").src = localStorage.getItem("blob-img");
        document.getElementById("file").files = null
    }
    // componentDidMount() {
    //     console.log(this.state.users)
    // }
    handleEditMode = (event) => {
        event.currentTarget.classList.add("active")
        document.getElementsByClassName("setting-biodata")[0].classList.add("active")
        let array = document.getElementsByClassName("input-edit")
        for (let index = 0; index < array.length; index++) {
            const element = array[index]
            element.removeAttribute("readOnly")
        }
    }
    hadnleDefaultProfile = async () =>{
        let data= {_id: this.state.users._id}
        this.props.actionDefaultProfile(data, this.source.token).then(result=>{
            this.source = axios.CancelToken.source()
            document.getElementById("profile-preview").src = result;
            document.getElementsByClassName("setting-change-profile")[0].classList.remove("active")
            document.getElementById("file").files = null
        }).catch(err=>{
            alert("Tidak dapat mengubah profile")
            this.source = axios.CancelToken.source()
        })
    }
    handleSaveProfile = async () =>{
        let data= new FormData()
        data.append("_id", this.state.users._id)
        data.append("profile", this.state.image)
        this.props.actionUpdateProfile(data, this.source.token).then(result=>{
            this.source = axios.CancelToken.source()
            document.getElementById("profile-preview").src = result;
            document.getElementsByClassName("setting-change-profile")[0].classList.remove("active")
            document.getElementById("file").files = null
        }).catch(err=>{
            alert("Tidak dapat mengubah profile")
            this.source = axios.CancelToken.source()
        })
    }
    handleCancelEditMode = (event) => {
        if (this.state.fieldInput.full_name !== this.state.users.full_name
            || this.state.fieldInput.private_email !== this.state.users.private_email
            || this.state.fieldInput.phone_number !== this.state.users.phone_number) {
            confirmAlert({
                title: "Konfirmasi!",
                message: "Apakah anda yakin membatalkan perubahan yang telah anda buat ?",
                buttons: [
                    {
                        label: "Ya",
                        className: "btn btn-success",
                        onClick: () => {
                            let name = this.state.users.full_name
                            let email_pribadi = this.state.users.private_email
                            let no_telepon = this.state.phone_number
                            // console.log(name)
                            this.setState({
                                users: localStorage.getItem("isLogin") ? JSON.parse(localStorage.getItem("isLogin")).user : {},
                                fieldInput: {
                                    full_name: name,
                                    private_email: email_pribadi,
                                    phone_number: no_telepon
                                }
                            })
                            document.getElementById("btn-edit").classList.remove("active");
                            document.getElementsByClassName("setting-biodata")[0].classList.remove("active");
                            let array = document.getElementsByClassName("input-edit");
                            for (let index = 0; index < array.length; index++) {
                                const element = array[index];
                                element.setAttribute("readOnly", "");
                            }
                        }
                    }, {
                        label: "Tidak",
                        className: "btn btn-danger"
                    }
                ]
            })
        } else {
            document.getElementById("btn-edit").classList.remove("active")
            document.getElementsByClassName("setting-biodata")[0].classList.remove("active")
            let array = document.getElementsByClassName("input-edit")
            for (let index = 0; index < array.length; index++) {
                const element = array[index]
                element.setAttribute("readOnly", "")
            }
        }
    }
    handleSaveEditMode = (event) => {
        if (this.state.fieldInput.full_name !== this.state.users.full_name
            || this.state.fieldInput.private_email !== this.state.users.private_email
            || this.state.fieldInput.phone_number !== this.state.users.phone_number) {
            confirmAlert({
                title: "Konfirmasi!",
                message: "Apakah anda yakin untuk menyimpan perubahan ?",
                buttons: [
                    {
                        label: "Ya",
                        className: "btn btn-success",
                        onClick: async () => {
                            let fields = this.state.fieldInput
                            fields["_id"] = this.state.users._id
                            const result = await this.props.actionUpdate(fields, this.source.token).catch(err => err)
                            if (result) {
                                this.setState({
                                    users: JSON.parse(localStorage.getItem("isLogin")).user
                                })
                                document.getElementById("btn-edit").classList.remove("active")
                                document.getElementsByClassName("setting-biodata")[0].classList.remove("active")
                                let array = document.getElementsByClassName("input-edit")
                                for (let index = 0; index < array.length; index++) {
                                    const element = array[index]
                                    element.setAttribute("readOnly", "")
                                }
                                this.source = axios.CancelToken.source()
                            } else {
                                alert("Failed to update!")
                            }
                        }
                    }, {
                        label: "Tidak",
                        className: "btn btn-danger"
                    }
                ]
            })
        } else {
            alert("Tidak ada perubahan yang dilakukan !")
        }
    }
    handleCancelUpdate = ()=>{
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    render() {
        return (
            <div className="page-content">
                <Loading handleCancel={this.handleCancelUpdate}></Loading>
                <div className="locations">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Data Diri</li>
                    </ul>
                </div>
                <div className="page-data-diri">
                    <div className="flex-row">
                        <div className="profile-img">
                            <img src={localStorage.getItem("blob-img")} alt="" id="profile-preview"/>
                            <div className="change-profile">
                                <input onInput={this.handleOnInput} type="file" name="file" id="file" />
                                <button className="btn btn-success" onClick={this.handleTriggerFile} id="change-profile"> <i className="fas fa-user-edit"></i> Ubah</button>
                                <button onClick={this.hadnleDefaultProfile} className="btn btn-primary" id="back-to-default">Default</button>
                            </div>
                            <div className="setting-change-profile">
                                <div className="file-name">
                                    <p id="temp-file-name"></p>
                                </div>
                                <div className="btn-settings">
                                    <button className="btn btn-danger" onClick={this.handleCancelChangeImg}> <i className="fas fa-times"></i> Batal</button>
                                    <button className="btn btn-success"onClick={this.handleSaveProfile} >  <i className="fas fa-check-square"></i> Simpan</button>
                                </div>
                            </div>
                        </div>
                        <div className="biodata">
                            <div className="header">
                                <h3>Biodata {this.state.users.role === 1 ? "HRD" : "Admin"}</h3>
                                <div className="setting">
                                    <button id="btn-edit" className="btn-none" onClick={this.handleEditMode}>
                                        <i className="fas fa-user-edit"></i>
                                    </button>
                                </div>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Nama</td>
                                        <td> : </td>
                                        <td> <input className="input-edit" onChange={this.handleChange} readOnly type="text" name="full_name" id="full_name" value={this.state.fieldInput.full_name} /> </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td> : </td>
                                        <td> {this.state.users.email} </td>
                                    </tr>
                                    <tr>
                                        <td>Email Pribadi</td>
                                        <td> : </td>
                                        <td> <input className="input-edit" onChange={this.handleChange} readOnly type="text" name="private_email" id="private_email" value={this.state.fieldInput.private_email} /> </td>
                                    </tr>
                                    <tr>
                                        <td>No Telepon</td>
                                        <td> : </td>
                                        <td> <input className="input-edit" onChange={this.handleChange} readOnly type="text" name="phone_number" id="phone_number" value={this.state.fieldInput.phone_number} /> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="setting-biodata">
                                <button onClick={this.handleSaveEditMode} className="btn btn-success">Simpan</button>
                                <button onClick={this.handleCancelEditMode} className="btn btn-danger">Batal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const reduxState = (state) => (
    {
        isLogin: state.isLogin,
        isLoading: state.isLoading,
        user: state.user, 
        profile: state.profile
    }
)
const reduxDispatch = (dispatch) => ({
    actionUpdate: (data, cancelToken) => dispatch(actionUpdate(data, cancelToken)),
    actionUpdateProfile: (data, cancelToken)=>dispatch(actionChangePorfileUser(data, cancelToken)),
    actionDefaultProfile: (data, cancelToken)=>dispatch(actionChangeProfileDefault(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(DataDiri)