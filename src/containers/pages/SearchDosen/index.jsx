import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputLabel from '../../../components/atoms/InputLabel'
import SelectLabel from '../../../components/atoms/SelectLabel'
import { actionSearchDosenBYHRD } from '../../../config/redux/action'
import Loading from '../Loading'
import './index.css'

class SearchDosen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendidikan_terakhir: [
                { text: "Pilih Pendidikan", value: "" },
                { text: "S1" },
                { text: "S2" },
                { text: "S3" },
                { text: "D4" },
                { text: "D3" }
            ],
            key: {
                nama: "",
                nip: "",
                pendidikan: "",
                nidn: "",
                jenis_kelamin: ""
            },
            result:[]
        }
        this.source = axios.CancelToken.source()
    }
    handleOnChange = (event) => {
        let temp = this.state.key
        temp[event.target.name] = event.target.value
        this.setState({
            key: temp
        })
    }
    handleOnClick = (event)=>{
        let key = {}
        if(this.state.key.nama_dosen !== ""){
            key["nama"]= this.state.key.nama
        }
        if(this.state.key.nidn !== ""){
            key["nidn"] = this.state.key.nidn
        }
        if(this.state.key.jenis_kelamin !== "Jenis Kelamin" && this.state.key.jenis_kelamin !== "" ){
            key["jenis_kelamin"] = this.state.key.jenis_kelamin
        }
        if(this.state.key.nip !== ""){
            key["nip"] = this.state.key.nip
        }
        if(this.state.key.pendidikan !== ""){
            key["pendidikan"] = this.state.key.pendidikan
        }
        if(JSON.stringify(key) in this.props.dosen_searched){
            this.setState({
                result: this.props.dosen_searched[JSON.stringify(key)]
            })
        }else{
            this.props.searchDosen(key, this.source.token)
            .then(result=>{
                this.setState({
                    result: this.props.dosen_searched[JSON.stringify(key)]
                })
            })
            .catch(err=>{
                this.setState({
                    result: []
                })
            })
        }
    }
    handleRedirect = (event)=>{
        const {history} = this.props
        let index = Number(event.currentTarget.getAttribute("data-index"))
        sessionStorage.setItem(event.currentTarget.getAttribute("data-target"), JSON.stringify(this.state.result[index]))
        history.push(event.currentTarget.getAttribute("data-target"))
        // console.log(sessionStorage.getItem(event.currentTarget.getAttribute("data-target")))
    }
    render() {
        return (
            <div className="page-content">
                <Loading></Loading>
                <div className="page-search-doesen">
                    <div className="input-filter">
                        <div className="data-row">
                            <div className="item-row">
                                <InputLabel onChange={this.handleOnChange} label="Nama Dosen" name="nama" id="nama" placeholder="Nama Dosen"></InputLabel>
                                <InputLabel onChange={this.handleOnChange} label="NIP" name="nip" id="nip" placeholder="nip"></InputLabel>
                                <SelectLabel text_choice={"Jenis Kelamin"} option={[{ text: "Jenis Kelamin", value: "" },{ text: "Laki-laki" }, { text: "Perempuan" }]} value={this.state.key.jenis_kelamin ? this.state.key.jenis_kelamin : "Jenis Kelamin"} onChange={this.handleOnChange} label="Jenis Kelamin" name="jenis_kelamin" id="jenis_kelamin" ></SelectLabel>
                            </div>
                            <div className="item-row">
                                <InputLabel onChange={this.handleOnChange} label="NIDN" type="text" name="nidn" id="nidn" placeholder="NIDN"></InputLabel>
                                <SelectLabel text_choice={"Pendidikan"} option={this.state.pendidikan_terakhir} value={this.state.key.pendidikan ? this.state.key.pendidikan : "Pendidikan"} onChange={this.handleOnChange} label="Pendidikan" name="pendidikan" id="pendidikan" ></SelectLabel>
                                <div className="button-exec-search">
                                    <button onClick={this.handleOnClick} className="btn btn-success"><i className="fas fa-search"></i> Cari data</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row-result mt-2">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nama Dosen</th>
                                    <th>NIP</th>
                                    <th>NIDN</th>
                                    <th>Pendidikan</th>
                                    <th>Jenis Kelamin</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.result !== undefined && this.state.result.map( (item, index)=> (
                                    <tr key={index}>
                                        <td data-index={index} onClick={this.handleRedirect} data-target={"/dosen/" + item._id} className="click-able">{item.private_data.nama}</td>
                                        <td>{item.private_data.nip}</td>
                                        <td>{item.private_data.nidn}</td>
                                        <td>{item.education_histories.map(item=>item.nama_pendidikan).toString()}</td>
                                        <td>{item.private_data.jenis_kelamin}</td>
                                    </tr>
                                ))}

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
        isLoading: state.isLoading,
        dosen_view: state.dosen_view,
        dosen_searched: state.dosen_searched
    }
)
const reduxDispatch = (dispatch) => ({
    searchDosen: (data, cancelToken)=> dispatch(actionSearchDosenBYHRD(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(SearchDosen)