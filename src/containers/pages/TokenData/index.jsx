import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import loadingButton from '../../../assets/img/icon/loading-confirmation.gif'
import './index.css'
import { actionConfirmToken, actiontakeAllToken, changeTokenProps } from '../../../config/redux/action'
import axios from 'axios'

class TokenData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_page: 0,
            starter: 1,
            offset: 6,
            filter: ["Menunggu", "Diterima", "Ditolak"]
        }
        this.source = axios.CancelToken.source()
    }
    componentDidMount() {
    }
    handlePagination = (event) => {
        let target = Number(event.currentTarget.getAttribute("data-target"))
        if (target + 1 <= Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset)) {
            let starter = target
            if (target === 1) {
                starter = 2
            }
            let current_page = target - 1
            this.setState({
                starter: starter,
                current_page: current_page
            })
        } else {
            let current_page = target - 1
            this.setState({
                current_page: current_page
            })
        }
    }
    handleConfirmationToken = async (event) => {
        event.currentTarget.classList.add("active")
        let confirm = event.currentTarget.getAttribute("data-confirm")
        let idTarget = event.currentTarget.getAttribute("data-id")
        let data = { confirm: confirm, _id: idTarget }
        let index = Number(event.currentTarget.getAttribute("data-index"))
        this.props.confirmTokenData(data, this.source.token)
            .then(result => {
                this.props.changePropsToken(index, this.props.token.filter(this.handleFilterData), confirm)
                let total = Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset)
                this.setState({
                    total: total,
                    show: this.props.token.filter(this.handleFilterData)
                })
                if(event.currentTarget !== null){
                    event.currentTarget.classList.remove("active")
                }
            })
            .catch(err => {
                console.log(err)
                if(event.currentTarget !== null){
                    event.currentTarget.classList.remove("active")
                }
            })
    }
    hadnleOnChangeFilter = (event)=>{
        let value = Number(event.currentTarget.value)
        if(value === 1){
            let data= ["Menunggu", "Diterima", "Ditolak"]
            this.setState({
                filter: data,
                current_page: 0,
            })
        }else if(value === 2){
            this.setState({
                filter:  ["Menunggu"],
                current_page: 0,
            })
        }else if(value === 3){
            this.setState({
                filter:  ["Diterima"],
                current_page: 0,
            })
        }else if(value === 4){
            this.setState({
                filter:  ["Ditolak"],
                current_page: 0,
            })
        }
    }
    handleFilterData = (data)=>{
        return this.state.filter.includes(data.status)
    }
    render() {
        return (
            <div className="page-content">
                <div className="locations">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li>Token</li>
                    </ul>
                </div>
                <div className="content-token">
                    <div className="header-token">
                        <h4>Semua Token</h4>
                        <div className="token-setting">
                            <select onInput={this.hadnleOnChangeFilter} name="" id="" className="token-filter ml-auto">
                                <option value="1">Semua</option>
                                <option value="2">Menunggu</option>
                                <option value="3">Diterima</option>
                                <option value="4">Ditolak</option>
                            </select>
                        </div>
                    </div>
                    <div className="body-token">
                        <div className="row-token">
                            {this.props.token.filter(this.handleFilterData).map((item, index) => {
                                if (index >= (this.state.current_page * this.state.offset) && index < ((this.state.current_page * this.state.offset) + this.state.offset)) {
                                    return (
                                        <div key={index} className="item-token">
                                            <div className="header-item">
                                                <h6>Pemintaan Data {item.employee && <span>{item.employee.private_data.nip + " - "+ item.employee.private_data.nama}</span>}</h6>
                                            </div>
                                            <div className="content-item">
                                                <div className="details">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><small>Nama</small></td>
                                                                <td> : </td>
                                                                <td> <small>{item.name}</small> </td>
                                                            </tr>
                                                            <tr>
                                                                <td><small>Email</small></td>
                                                                <td> : </td>
                                                                <td> <small>{item.email}</small> </td>
                                                            </tr>
                                                            <tr>
                                                                <td><small>No Telepon</small></td>
                                                                <td> : </td>
                                                                <td> <small>{item.phone_number}</small> </td>
                                                            </tr>
                                                            <tr>
                                                                <td><small>TOKEN</small></td>
                                                                <td> : </td>
                                                                <td> <small>{item.token}</small> </td>
                                                            </tr>
                                                            <tr>
                                                                <td><small>Count</small></td>
                                                                <td> : </td>
                                                                <td> <small>{item.count}</small> </td>
                                                            </tr>
                                                            <tr>
                                                                <td><small>Tanggal Expired</small></td>
                                                                <td> : </td>
                                                                <td> <small>{(new Date(item.expired_at)).toLocaleString("id-ID", {timeZone : "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"})}</small> </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="content-footer">
                                                {item.status === "Menunggu" && <button data-confirm="Diterima" data-id={item._id} onClick={this.handleConfirmationToken} data-index={index} className="btn btn-success">
                                                    <span className="before">Terima</span> <span className="after"><img src={loadingButton} alt="" /></span>
                                                    </button>}
                                                {item.status === "Menunggu" && <button data-confirm="Ditolak" data-id={item._id} onClick={this.handleConfirmationToken} data-index={index} className="btn btn-danger">
                                                <span className="before">Tolak</span> <span className="after"><img src={loadingButton} alt="" /></span>
                                                    </button>}
                                                {item.status === "Menunggu" && <span className="Token-Menunggu ml-auto">Menunggu</span>}
                                                {item.status === "Diterima" && <span className="Token-Diterima ml-auto">Diterima</span>}
                                                {item.status === "Ditolak" && <span className="Token-Ditolak ml-auto">Ditolak</span>}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return ""
                                }
                            })}
                        </div>
                        <div className="paginate">
                            {Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset) > 1 && (
                                <ul>
                                    {this.state.starter - 3 >= 1 && <li data-target={this.state.starter - 3} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter - 3 ? "active" : ""}>{this.state.starter - 3}</li>}
                                    {this.state.starter - 2 >= 1 && <li data-target={this.state.starter - 2} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter - 2 ? "active" : ""}>{this.state.starter - 2}</li>}
                                    {this.state.starter - 1 >= 1 && <li data-target={this.state.starter - 1} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter - 1 ? "active" : ""}>{this.state.starter - 1}</li>}
                                    <li data-target={this.state.starter} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter ? "active" : ""}>{this.state.starter}</li>
                                    {this.state.starter + 1 <= Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset) && <li data-target={this.state.starter + 1} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter + 1 ? "active" : ""}>{this.state.starter + 1}</li>}
                                    {this.state.starter + 2 <= Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset) && <li data-target={this.state.starter + 2} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter + 2 ? "active" : ""}>{this.state.starter + 2}</li>}
                                    {this.state.starter + 3 <= Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset) && <li data-target={this.state.starter + 3} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter + 3 ? "active" : ""}>{this.state.starter + 3}</li>}
                                    {this.state.starter + 4 <= Math.ceil(this.props.token.filter(this.handleFilterData).length / this.state.offset) && <li data-target={this.state.starter + 4} onClick={this.handlePagination} className={this.state.current_page + 1 === this.state.starter + 4 ? "active" : ""}>{this.state.starter + 4}</li>}
                                </ul>
                            )}
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
        notif: state.notif,
        token: state.token,
        user: state.user,
    }
)
const reduxDispatch = (dispatch) => ({
    getAllToken: (offset, limit) => dispatch(actiontakeAllToken(offset, limit)),
    confirmTokenData: (data, cancelToken) => dispatch(actionConfirmToken(data, cancelToken)),
    changePropsToken: (index, data, confirmation) => dispatch(changeTokenProps(index, data, confirmation))
})
export default connect(reduxState, reduxDispatch)(TokenData)