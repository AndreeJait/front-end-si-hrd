import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import './index.css'
import axios from 'axios';
import { APIBASE } from '../../../config/constants';
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: "Klasifikasi Pegawai",
            data: []
          }
        ]
      },
      dataFakultas: {
        labels: [],
        datasets: [
          {
            label: "Pegawai Per Fakultas",
            data: []
          }
        ]
      },
      jabatan: []
    }
  }
  componentDidMount() {
    axios.get(APIBASE + "employees/group/klasifikasi")
      .then(result => {
        let data = this.state.data
        data.labels = result.data.result.map((item) => {
          if (item._id === "") {
            return "Belum Diklaskifikasikan";
          } else {
            return item._id
          }
        })
        data.datasets[0].data = result.data.result.map((item) => { return item.total })
        console.log(data)
        this.setState({
          data: data
        })
      }).catch(err => {
        console.log(err)
      })
    axios.get(APIBASE + "employees/group/fakultas")
      .then(result => {
        let dataFakultas = this.state.dataFakultas
        dataFakultas.labels = result.data.result.map((item) => {
          if (item._id === "") {
            return "Belum Diklaskifikasikan";
          } else {
            return item._id
          }
        })
        dataFakultas.datasets[0].data = result.data.result.map((item) => { return item.total })
        this.setState({
          dataFakultas: dataFakultas
        })
      }).catch(err => {
        console.log(err)
      })
    axios.get(APIBASE + "employees/jabatan/functional/active")
      .then(result => {
        this.setState({
          jabatan: result.data.result
        })
        console.log(result.data)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="page-content">
        <div className="locations">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li></li>
          </ul>
        </div>
        <div className="content-dashboard">
          <div className="side-left">
            {this.state.data.labels.length !== 0 && (
              <Line data={this.state.data}></Line>
            )}
            {this.state.dataFakultas.labels.length !== 0 && (
              <Line data={this.state.dataFakultas}></Line>
            )}

          </div>
          <div className="side-right">
            <h5>Jabatan Fungsional</h5>
            <div className="row-jabatan">
              {this.state.jabatan.length !== 0 && this.state.jabatan.map((item, index) => {
                return (
                  <div className="item-jabatan ">
                    <h6>{item.positions[0].jabatan_fungsional}</h6>
                    <strong>{item.private_data.nama}</strong><br />
                    <small>{(new Date(item.positions[0].tmt)).toLocaleDateString("id-ID", {timeZone: "Asia/Jakarta", day:"2-digit", month:"long", year: "numeric"})}</small>
                  </div>
                )
              })}
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
  }
)
const reduxDispatch = (dispatch) => ({

})
export default connect(reduxState, reduxDispatch)(Dashboard)