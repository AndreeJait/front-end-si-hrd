import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { APIBASE } from '../../../config/constants'
// import InputCustom from '../../../components/atoms/InputCustom'
import { actionSearchDosen, actionSendRequestData } from '../../../config/redux/action'
import Loading from '../Loading'
import './index.css'
import NotFoundImg from '../../../assets/img/icon/data-not-found.png'
import ModalBox from '../../../components/organisms/ModalBox'
import { Link } from 'react-router-dom'
class RequestData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: "",
            result: [],
            suggest: [],
            fieldRequest: {
                id: "",
                nama: "",
                email: "",
                no_telepon: ""
            }
        }
        this.source = axios.CancelToken.source()
    }
    handleChange = (event) => {
        document.getElementById("suggest").classList.add("active")
        let suggest = []
        let repo_suggest = localStorage.getItem("search-history") ? localStorage.getItem("search-history").split(",") : []
        if (event.currentTarget.value.length > 0) {

            for (let index = repo_suggest.length - 1; index >= 0; index--) {
                const element = repo_suggest[index];
                if (element.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) !== -1) {
                    suggest.push(element)
                }
            }
        } else {
            let limit = (repo_suggest.length - 7) > 0 ? (repo_suggest.length - 7) : 0
            for (let index = repo_suggest.length - 1; index >= limit; index--) {
                const element = repo_suggest[index];
                suggest.push(element)
            }
        }
        this.setState({
            key: event.currentTarget.value,
            suggest: suggest
        })

    }
    handleOnClick = async (event) => {
        if (this.state.key.length > 0) {
            let result = await this.props.actionSearch(this.state.key, this.source.token).catch(err => err)
            this.setState({
                result: result
            })
            // console.log(this.state.result)
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleOnClickNode, false)
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleOnClickNode, false)
    }
    handleOnClickNode = (event) => {
        if (document.contains(event.target)) {
            let click = true
            for (let index = 0; index < document.getElementsByClassName("list-suggest-item").length; index++) {
                if (document.getElementsByClassName("list-suggest-item")[index] === event.target) {
                    click = false
                }
            }
            if (click) {
                document.getElementById("suggest").classList.remove("active")
            }
        }
    }
    handleOnFocus = (event) => {
        document.getElementById("suggest").classList.add("active")
        let suggest = []
        let repo_suggest = localStorage.getItem("search-history") ? localStorage.getItem("search-history").split(",") : []
        if (event.currentTarget.value.length > 0) {

            for (let index = repo_suggest.length - 1; index >= 0; index--) {
                const element = repo_suggest[index];
                if (element.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) !== -1) {
                    suggest.push(element)
                }
            }
        } else {
            let limit = (repo_suggest.length - 7) > 0 ? (repo_suggest.length - 7) : 0
            for (let index = repo_suggest.length - 1; index >= limit; index--) {
                const element = repo_suggest[index];
                suggest.push(element)
            }
        }
    }
    handleOnSelectSuggest = (event) => {
        event.preventDefault()
        let value = event.currentTarget.getAttribute("data-value")
        this.setState({
            key: value
        })
        document.getElementById("key").value = value
        document.getElementById("suggest").classList.remove("active")
        // console.log(this.state.key)
    }
    handleCancel = () => {
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    handleSelectCard = (event) => {
        let target = document.getElementById(event.currentTarget.getAttribute("data-target"))
        target.classList.add("active")
        let value =event.currentTarget.getAttribute("data-id")
        let fieldRequest = this.state.fieldRequest
        fieldRequest.id = value
        this.setState({
            fieldRequest: fieldRequest
        })
    }
    handleModalSaveClick = async (event) => {
        let target = document.getElementById("request-data-modal")
        target.classList.remove("active")
        let data = {
            name: this.state.fieldRequest.nama,
            email: this.state.fieldRequest.email,
            employee_id: this.state.fieldRequest.id,
            phone_number: this.state.fieldRequest.no_telepon
        }
        this.props.actionSendRequest(data, this.source.token)
        .then(result=>{
            if(result.status === 200){
                alert("Succes To Request Data")
                let field = this.state.fieldRequest
                field.nama = ""
                field.email = ""
                field.id = ""
                field.no_telepon = ""
                this.setState({
                    fieldRequest :field
                })
            }
        })
        .catch(err=>{
            if(err.status === 409){
                alert("Anda Sudah Melakukan Request Data!")
            }
        })
    }
    handleOnChangeRequest = (event)=>{
        let value = event.currentTarget.value
        let fieldRequest = this.state.fieldRequest
        fieldRequest[event.currentTarget.name] = value
        this.setState({
            fieldRequest: fieldRequest
        })
    }
    render() {
        return (
            <div className="container">
                <div className="page-80vh p-3">
                    <h2>Request Data Dosen</h2>
                    <div className="search-box-inline">
                        <input onFocus={this.handleOnFocus} type="text" name="key" id="key" autoComplete="off" onChange={this.handleChange} />
                        <button onClick={this.handleOnClick} className="btn-none"><i className="fas fa-search"></i></button>
                        <div className="suggest" id="suggest">
                            <ul id="list-suggest">
                                {this.state.suggest.map((item, index) => {
                                    return <li className="list-suggest-item" data-value={item} onClick={this.handleOnSelectSuggest} key={index}>{item}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="data-result">
                    <p>Sudah menerima token ? <Link to="/data/token">Klik disini untuk mengambil data anda</Link></p>
                        <div className="data-count">
                            <h4>Ditemukan {this.state.result.length} data Dosen </h4>
                        </div>
                        <Loading handleCancel={this.handleCancel}></Loading>
                        <div className="row-data">
                            {
                                this.state.result.map((item, index) => {
                                    return (
                                        <div key={index} className="card-result">
                                            <img src={item.private_data.foto_diri.search("upload") === 0 ? APIBASE + item.private_data.foto_diri : item.private_data.foto_diri} alt="" />
                                            <div className="card-detail">
                                                <p>NIP : {item.private_data.nip}</p>
                                                <p>Nama : {item.private_data.nama}</p>
                                                <p>Email : {item.private_data.email}</p>
                                                <button onClick={this.handleSelectCard} data-id={item._id} data-target="request-data-modal" className="btn btn-success">Minta data lengkap</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }{
                                this.state.result.length === 0 && <img className="not-found-img" src={NotFoundImg} alt="" />
                            }
                            
                        </div>
                    </div>
                </div>
                <ModalBox target="request-data-modal" title="Request Data" buttons={[["btn btn-success", "fas fa-check", "Kirimkan", this.handleModalSaveClick]]}>
                    <div className="request-form">
                        <h5>Isi From Dibawah Untuk Melakukan Request Data</h5>
                        <div className="form-vertical">
                            <div className="form-input">
                                <label htmlFor="nama">Nama Lengkap</label>
                                <input onChange={this.handleOnChangeRequest} type="text" name="nama" id="nama"  value={this.state.fieldRequest.nama}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="email">Email</label>
                                <input onChange={this.handleOnChangeRequest} type="email" name="email" id="email" value={this.state.fieldRequest.email}/>
                            </div>
                            <div className="form-input">
                                <label htmlFor="no_telepon">Phone Number</label>
                                <input onChange={this.handleOnChangeRequest} type="text" name="no_telepon" id="no_telepon" value={this.state.fieldRequest.no_telepon}/>
                            </div>
                        </div>
                    </div>
                </ModalBox>
            </div>
        )
    }
}
const reduxState = (state) => (
    {
        isLoading: state.isLoading
    }
)
const reduxDispatch = (dispatch) => ({
    actionSearch: (data, token) => dispatch(actionSearchDosen(data, token)),
    actionSendRequest: (data, token)=>dispatch(actionSendRequestData(data, token))
})
export default connect(reduxState, reduxDispatch)(RequestData)