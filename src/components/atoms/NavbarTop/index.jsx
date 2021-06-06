import { React, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import logo from '../../../assets/img/logo/Logo.png'
import loading from '../../../assets/img/icon/loading-button.gif'
import logo_extends from '../../../assets/img/logo/Logo-extends.png'
import { actionLogOut, actionReadNotif, changeExpandNavbar } from '../../../config/redux/action'
import './index.css'
import channel from '../../../config/pusher'
import axios from 'axios'
const NavbarTop = (props) => {
    const history = useHistory()
    const [source, setSource] = useState(axios.CancelToken.source())
    const HandleOnLogOut = (event) => {
        localStorage.removeItem("isLogin")
        localStorage.removeItem("blob-img")
        localStorage.removeItem("notif")
        props.actionLogOut()
        sessionStorage.clear()
        localStorage.clear()
        channel.disconnect()
        history.push("/login")
    }
    const handleDropDown = (event) => {
        event.preventDefault();
        const target = document.getElementById(event.currentTarget.getAttribute("data-target"))
        const dropdownActive = document.getElementsByClassName("dropdown-item active")
        const navbarActive = document.getElementsByClassName("link-navbar active")
        for (let index = 0; index < dropdownActive.length; index++) {
            if (dropdownActive[index] !== target) {
                dropdownActive[index].classList.remove("active")
            }
        }
        for (let index = 0; index < navbarActive.length; index++) {
            if (navbarActive[index] !== event.currentTarget) {
                navbarActive[index].classList.remove("active")
            }
        }
        target.classList.toggle("active")
        event.currentTarget.classList.toggle("active")
        target.style.top = Number(event.currentTarget.offsetTop) + Number(event.currentTarget.offsetHeight) + "px"
        target.style.left = Number(event.currentTarget.offsetLeft) - Number(target.offsetWidth) + Number(event.currentTarget.offsetWidth) + "px"
    }
    const handleExpandNavbar = ()=>{
        if(props.isNavbarExpand === "false"){
            props.changeExpandNavbar("true")
            localStorage.setItem("isExpand", "true")
        }else{
            props.changeExpandNavbar("false")
            localStorage.setItem("isExpand", "false")
        }
    }
    const handleReadNotif = (event)=>{
        let _id = event.currentTarget.getAttribute("data-id")
        let data = {_id: _id, idUser:props.user._id}
        // event.currentTarget.classList.add("active")
        props.readNotif(data, source.cancel)
        .then(result=>{
            setSource(axios.CancelToken.source())
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <nav className="navbar-top">
            <Link to="/" className={props.isNavbarExpand === "true"?"navbar-brand active" : "navbar-brand"}>
                <img id="logo-web"  src={props.isNavbarExpand === "true" ? logo_extends : logo} alt="" />
            </Link>
            <button className="navbar-btn" onClick={handleExpandNavbar}><i className="fas fa-bars"></i></button>
            <ul className="navbar-item ml-auto">
                <li>
                    <Link id="notifikasi-trigger" onClick={handleDropDown} to="#" className="link-navbar" data-target="notifikasi"><i className="far fa-bell"></i> <span id="total-notif">{props.notif.length}</span></Link>
                    <div className="dropdown-item" id="notifikasi">
                        <ul>
                        {props.notif.sort((a,b)=>{ return (new Date(b.tanggal_notif)) - (new Date(a.tanggal_notif))}).map((item, index)=>{
                            return (
                                <li key={index} ><small >{item.content}</small> <br /><button onClick={handleReadNotif} data-id={item._id} className="btn read-notif"><small> Mark as read</small> <img src={loading} alt="Loading" /> </button></li>
                            )
                        })}
                        </ul>
                    </div>
                </li>
                <li>
                    <Link id="profile-trigger" onClick={handleDropDown} to="#" className="link-navbar user-pop" data-target="pop-profile">
                        <img src={ props.profile } alt="" />
                        {props.user.name}
                    </Link>
                    <div className="dropdown-item" id="pop-profile">
                        <div className="user-bio">
                            <img src={ props.profile }  alt="" />
                            <h6>{props.user.full_name}</h6>
                        </div>
                        <div className="user-setting">
                            <Link className="btn btn-configure" to="/datadiri">Profile</Link>
                            <button onClick={HandleOnLogOut} className="btn btn-configure ml-auto">Log out</button>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

const reduxState = (state) => (
    {
        isLogin: state.isLogin,
        isNavbarExpand: state.isNavbarExpand, 
        user:state.user,
        notif: state.notif,
        profile: state.profile
    }
)
const reduxDispatch = (dispatch) => ({
    changeExpandNavbar: (condition) =>dispatch(changeExpandNavbar(condition)), 
    actionLogOut: ()=>dispatch(actionLogOut()),
    readNotif:(data, cancelToken)=>dispatch(actionReadNotif(data, cancelToken))
})

export default connect(reduxState, reduxDispatch)(NavbarTop)