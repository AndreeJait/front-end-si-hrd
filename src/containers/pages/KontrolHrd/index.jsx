import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { APIBASE } from '../../../config/constants';
import { actionAddUsers, actionDeleteUsers, actionGetAllUsers, actionSetPasswordDefault } from '../../../config/redux/action';
import './index.css';
import Loading from '../Loading'
import axios from 'axios';
class KontrolHrd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hrd: [],
            fieldAdd: {
                full_name: "",
                email: "",
                private_email: "",
                phone_number: "",
                profile: null,
                role: 1,
                password: ""
            }
        }
        this.source = axios.CancelToken.source()
    }
    componentDidMount() {
        this.handleReloadPage()
    }
    handleReloadPage = () => {
        this.props.getAllUsers()
            .then(result => {
                this.setState({
                    hrd: result.result
                })
            }).catch(err => {
                console.log("Failed to take data");
            })
    }
    handleSetPasswordDefault = (event) => {
        let id = event.currentTarget.getAttribute("data-id");
        this.props.setPasswordDefault({ _id: id }, this.source.token)
            .then(result => {
                this.handleReloadPage()
                alert("Success to set default")
                this.source = axios.CancelToken.source()
            }).catch(err => {
                alert("Failed to set password default")
            })
    }
    handleDeletePegawai = (event) => {
        let id = event.currentTarget.getAttribute("data-id");
        this.props.deleteUsers(id, this.source.token)
            .then(result => {
                this.handleReloadPage()
                this.source = axios.CancelToken.source()
            }).catch(err => {
                alert("Failed delete users")
            })
    }
    handleCancelUpdate = () => {
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    handleShowModal = (event) => {
        document.getElementById("modal-box").classList.add("active")
    }
    handleCloseModal = (event) => {
        document.getElementById("modal-box").classList.remove("active")
        this.setState({
            fieldAdd: {
                full_name: "",
                email: "",
                private_email: "",
                phone_number: "",
                profile: null,
                role: 1,
                password: ""
            }
        })
    }
    handleAddDosen = (event) => {
        let formData = new FormData()
        for (let key in this.state.fieldAdd) {
            formData.append(key, this.state.fieldAdd[key])
        }
        this.props.addUsers(formData, this.source.token)
            .then(result => {
                this.handleReloadPage()
                alert("Success to add data")
                this.source = axios.CancelToken.source()
                this.handleCloseModal()
            }).catch(err => {
                alert("Failed to add data")
            })
    }
    handleOnChange = (event) => {
        let field = this.state.fieldAdd
        field[event.currentTarget.name] = event.currentTarget.value
        this.setState({
            fieldAdd: field
        })
    }
    handleOnChangeProfile = (event) => {
        if (event.currentTarget.files[0]) {
            let field = this.state.fieldAdd
            field[event.currentTarget.name] = event.currentTarget.files[0]
            this.setState({
                fieldAdd: field
            })
        }
    }
    render() {
        return (
            <div className="page-content">
                <div className="locations">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li> Kontrol HRD</li>
                    </ul>
                </div>
                <div className="kontrol-hrd">
                    <h4>Semua HRD</h4>
                    <div className="config-button">
                        <button onClick={this.handleShowModal} className=" mt-2 btn btn-primary button-rounded"> <i className="fas fa-plus"></i> Tambahkan Users</button>
                    </div>

                    <div className="modal-box-v2" id="modal-box">
                        <div className="header">
                            <h5>Tambahkan Users Baru</h5>
                        </div>
                        <div className="content">
                            <div className="input-label">
                                <label htmlFor="full_name">Nama Lengkap</label>
                                <input onChange={this.handleOnChange} type="text" name="full_name" id="full_name" value={this.state.fieldAdd.full_name} />
                            </div>
                            <div className="input-label">
                                <label htmlFor="email">Email</label>
                                <input onChange={this.handleOnChange} type="text" name="email" id="email" value={this.state.fieldAdd.email} />
                            </div>
                            <div className="input-label">
                                <label htmlFor="password">Password</label>
                                <input onChange={this.handleOnChange} type="text" name="password" id="password" value={this.state.fieldAdd.password} />
                            </div>
                            <div className="input-label">
                                <label htmlFor="private_email">Email Pribadi</label>
                                <input onChange={this.handleOnChange} type="text" name="private_email" id="private_email" value={this.state.fieldAdd.private_email} />
                            </div>
                            <div className="input-label">
                                <label htmlFor="phone_number">No Telepon</label>
                                <input onChange={this.handleOnChange} type="text" name="phone_number" id="phone_number" value={this.state.fieldAdd.phone_number} />
                            </div>
                            <div className="file-label">
                                <label htmlFor="profile">Foto Profile</label>
                                <input onChange={this.handleOnChangeProfile} type="file" name="profile" id="profile" />
                            </div>
                        </div>
                        <div className="footer">
                            <button onClick={this.handleAddDosen} className="btn btn-success button-rounded">Simpan</button>
                            <button onClick={this.handleCloseModal} className="btn btn-danger ml-auto button-rounded">Close</button>
                        </div>
                    </div>
                    <Loading handleCancel={this.handleCancelUpdate}></Loading>
                    <div className="table-hrd mt-2">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Lengkap</th>
                                    <th>Email</th>
                                    <th>Email Pribadi</th>
                                    <th>No Telepon</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.hrd.length !== 0 &&
                                    this.state.hrd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.full_name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.private_email}</td>
                                                <td>{item.phone_number}</td>
                                                <td><img src={APIBASE + item.profile} alt="" /></td>
                                                <td className="column">
                                                    <button onClick={this.handleDeletePegawai} data-id={item._id} className="btn btn-danger button-rounded">Delete</button><br />
                                                    <button onClick={this.handleSetPasswordDefault} data-id={item._id} className="btn btn-primary button-rounded">Set Password Default</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const reduxState = (state) => (
    {
        isLogin: state.isLogin,
    }
)
const reduxDispatch = (dispatch) => ({
    getAllUsers: () => dispatch(actionGetAllUsers()),
    setPasswordDefault: (data, cancelToken) => dispatch(actionSetPasswordDefault(data, cancelToken)),
    deleteUsers: (id) => dispatch(actionDeleteUsers(id)),
    addUsers: (data, cancelToken) => dispatch(actionAddUsers(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(KontrolHrd);