import React, { Component } from 'react'
import { connect } from 'react-redux'
import loading from '../../../assets/img/icon/loading-page.gif'
import './index.css'

class Loading extends Component{
    handleCancelAction = (event)=>{
        this.props.handleCancel()
    }
    render(){
        return(
            <div className={this.props.isLoading ? "temp-loading active" : "temp-loading"}>
                <div className="loading-content">
                    <img src={loading} alt=""/><br/>
                    <button onClick={this.handleCancelAction} className="btn btn-danger">Batalkan</button>
                </div>
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
  })
export default connect(reduxState, reduxDispatch)(Loading)