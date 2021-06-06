import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2';

import './index.css'
import { actionGetFakultas, actionGetJabatanActive, actionGetKlasifikasi, actionGetProdi } from '../../../config/redux/action';
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      klasifikasi: {
        labels: [],
        datasets: [
          {
            label: "Klasifikasi Pegawai",
            data: []
          }
        ]
      },
      prodi:{
        labels: [],
        datasets: [
          {
            label: "Fakultas",
            data: []
          }
        ]
      },
      fakultas:{
        labels: [],
        datasets: [
          {
            label: "Fakultas",
            data: []
          }
        ]
      },
      tempProdi: [],
      jabatan: [],
      select: ""
    }
  }
  componentDidMount() {
    this.props.getKlasifikasi()
      .then(result=>{
        let klasifikasi = this.state.klasifikasi
        result.forEach((item)=>{
          if(item._id === ""){
            klasifikasi.labels.push("Belum didata")
          }else{
            klasifikasi.labels.push(item._id)
          }
          klasifikasi.datasets[0].data.push(item.total)
        })
        this.setState({
          klasifikasi: klasifikasi
        })
        console.log("Sini")
      }).catch(err=>{
        console.log("Failed to get data.")
      })
    this.props.getFakultas()
    .then(result=>{
      let klasifikasi = this.state.fakultas
      result.forEach((item)=>{
        if(item._id.trim() === ""){
          klasifikasi.labels.push("Belum didata")
        }else{
          klasifikasi.labels.push(item._id)
          this.props.getProdi(item._id)
            .then(result=>{
              let temp = {
                label: item._id,
                labels: [],
                data: []
              }
              result.forEach(item=>{
                  temp.labels.push(item._id)
                  temp.data.push(item.total)
              })
              let tempProdi = this.state.tempProdi
              tempProdi.push(temp)
              this.setState({
                tempProdi: tempProdi
              })
            }).catch(err=>{

            })
        }
        klasifikasi.datasets[0].data.push(item.total)
      })
      this.setState({
        fakultas: klasifikasi
      })
    }).catch(err=>{
      console.log("Failed to get data.")
    })
     this.props.getJabatan()
     .then(result=>{
        this.setState({
          jabatan: result
        })
     }).catch(err=>{
      console.log("Failed to get data.")
     }) 
  }
  handleOnChange= (event)=>{
    let index = Number(event.currentTarget.value)
    if(index > -1){
      let prodi = this.state.prodi
      prodi.labels = this.state.tempProdi[index].labels
      prodi.datasets[0].data = this.state.tempProdi[index].data
      this.setState({
        select: this.state.tempProdi[index].label,
        prodi: prodi
      })
    }else{
      this.setState({
        select: ""
      })
    }
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
            <div className="row-charts">
             {this.state.klasifikasi.labels.length !== 0 && 
              <div className="item-charts">
                <h4>Klasifikasi Pegawai</h4>
                <Line data={this.state.klasifikasi} ></Line>
              </div>
             }
             {this.state.fakultas.labels.length !== 0 && 
              <div className="item-charts">
                <h4>Pegawai Fakultas</h4>
                <Line data={this.state.fakultas} ></Line>
              </div>
             }
             {this.state.fakultas.labels.length !== 0 && 
              <div className="item-charts">
                <h4>Pegawai Per Prodi Fakultas</h4>
                <select className="select-file" name="prodi" id="prodi" onChange={this.handleOnChange}>
                  <option value="-1">Pilih Prodi</option>
                  {this.state.tempProdi.length !== 0 && 
                    this.state.tempProdi.map((item, index)=>{
                      return(
                        <option key={index} value={index}>{item.label}</option>
                      )
                    })
                  }
                </select>
                {this.state.select !== "" && <Line data={this.state.prodi} ></Line>}
              </div>
             }
            </div>
          </div>
          <div className="side-right">
            <h5>Jabatan Fungsional</h5>
            <div className="row-jabatan">
                {this.state.jabatan.length !== 0 && 
                  this.state.jabatan.map((item, index)=>{
                    return(
                      <div className="item-jabatan">
                        <h6>{item.positions[0].jabatan_fungsional}</h6>
                        <strong>{item.private_data.nama}</strong><br />
                        <small>{(new Date(item.positions[0].tmt)).toLocaleDateString("id-ID", {timeZone: "Asia/Jakarta", month: "long", day: "2-digit", year: "numeric"})}</small>
                      </div>
                    )
                  })
                }
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
  getKlasifikasi :()=>dispatch(actionGetKlasifikasi()),
  getFakultas: ()=>dispatch(actionGetFakultas()),
  getProdi: (fakultas)=>dispatch(actionGetProdi(fakultas)),
  getJabatan: ()=>dispatch(actionGetJabatanActive())
})
export default connect(reduxState, reduxDispatch)(Dashboard)