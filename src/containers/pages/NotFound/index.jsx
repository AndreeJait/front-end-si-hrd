import React, { Component } from 'react'
import './index.css'
import ImgNotFound from '../../../assets/img/web/errot-not-found.png'
class NotFound extends Component{
    render(){
        return(
            // <img src={ImgNotFound} className="img-not-found" alt="" width="100%"/>
            <div className="page-content">
                <div className="page-not-found">
                    <img src={ImgNotFound} alt="Logo Not Found"/>
                </div>
            </div>
        )
    }
}
export default NotFound