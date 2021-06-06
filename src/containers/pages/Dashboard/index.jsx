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