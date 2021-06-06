import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import './index.css'
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
      jabatan: []
    }
  }
  componentDidMount() {
 
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
            <Line data={this.state.data} ></Line>
          </div>
          <div className="side-right">
            <h5>Jabatan Fungsional</h5>
            <div className="row-jabatan">
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