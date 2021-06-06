import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'
import { changeExpandNavbar } from '../../../config/redux/action'
import { connect } from 'react-redux'
import logo from '../../../assets/img/logo/Logo.png'
import logo_extends from '../../../assets/img/logo/Logo-extends.png'
function RightNavbar(props) {
    const history = useHistory();
    const [navbarItem] = useState([
        ["no", "fas fa-tachometer-alt", "Dashboard", "/"],
        ["yes", "fas fa-chalkboard-teacher", "Data Dosen", "target-1",
            [
                ["fas fa-plus-square", "Tambahkan Dosen Baru", "/dosen/add"],
                ["fas fa-search", "Cari Data Dosen", "/dosen"]
            ]
        ],
        ["no", "fas fa-laptop-code", "Token", "/token"],
        ["no", "fas fa-user", "Data Diri", "/datadiri"],
    ]);
    const [navbarAdminItem] = useState([
        ["no", "fas fa-tachometer-alt", "Dashboard", "/"],
        ["yes", "fas fa-chalkboard-teacher", "Data Dosen", "target-1",
            [
                ["fas fa-plus-square", "Tambahkan Dosen Baru", "/dosen/add"],
                ["fas fa-search", "Cari Data Dosen", "/dosen"]
            ]
        ],
        ["no", "fas fa-laptop-code", "Token", "/token"],
        ["no", "fas fa-users", "Kontrol HRD", "/hrd"],
        ["no", "fas fa-user", "Data Diri", "/datadiri"],
    ]);
    useEffect(()=>{
        if(window.outerWidth < 1000){
            document.getElementById("logo-web").src = logo_extends
            document.getElementsByClassName("navbar-right")[0].classList.add("active")
            document.getElementsByClassName("navbar-brand")[0].classList.add("active")
        }
        window.onresize = (event)=>{
            if(event.currentTarget.outerWidth < 1000){
                if(document.getElementById("logo-web")!= null){
                    document.getElementById("logo-web").src = logo_extends
                    document.getElementsByClassName("navbar-right")[0].classList.add("active")
                    document.getElementsByClassName("navbar-brand")[0].classList.add("active")
                }
                
            }else{
                if(props.isNavbarExpand === "false"){
                    if( document.getElementById("logo-web") !=null){
                        document.getElementById("logo-web").src = logo
                        document.getElementsByClassName("navbar-right")[0].classList.remove("active")
                        document.getElementsByClassName("navbar-brand ")[0].classList.remove("active")
                    }
                }
            }
        }
    })
    const checkIsInsideDropDown = (index)=>{
        let isTrue = -1
        if(props.user.role === 1){
            for (let i = 0; i < navbarItem[index][4].length; i++) {
                if(navbarItem[index][4][i][2] === history.location.pathname){
                    isTrue = i
                    break;
                }
            }
        }else{
            for (let i = 0; i < navbarAdminItem[index][4].length; i++) {
                if(navbarAdminItem[index][4][i][2] === history.location.pathname){
                    isTrue = i
                    break;
                }
            }
        }
        return isTrue 
    }
    const handleClick = (event) => {
        let elemetns =  document.getElementsByClassName("link active")
        let dropdownitems = document.getElementsByClassName("active-dropdown")
        if(dropdownitems.length > 0){
            dropdownitems[0].classList.remove("active-dropdown")
        }
        if(elemetns.length > 0){
            elemetns[0].classList.remove("active")
        }
        event.currentTarget.classList.add("active")
        let index = Number(event.currentTarget.getAttribute("data-index"))
        if (props.user.role === 1) {
            if(navbarItem[index][0] === "no"){
                history.push(navbarItem[index][3])
            }
        }else{
            if(navbarAdminItem[index][0] === "no"){
                history.push(navbarAdminItem[index][3])
            }
        }
    }
    const handleClickDrodpownItem = (event)=>{
        let elemetns =  document.getElementsByClassName("link active")
        let dropdownitems = document.getElementsByClassName("active-dropdown")
        if(dropdownitems.length > 0){
            dropdownitems[0].classList.remove("active-dropdown")
        }
        if(elemetns.length > 0){
            elemetns[0].classList.remove("active")
        }
        let parent_index= event.currentTarget.getAttribute("data-target")
        let index= event.currentTarget.getAttribute("data-index")
        let temp = null
        if(props.user.role === 1){
            temp = navbarItem[parent_index][4][index]
        }else{
            temp = navbarAdminItem[parent_index][4][index]
        }
        document.getElementById("dropdowns-" + parent_index).classList.add("active")
        event.currentTarget.classList.add("active-dropdown")
        history.push(temp[2])
    }
    const handleDropdownLinkClick = (event)=>{
        event.currentTarget.classList.toggle("clicked")
    }
    return (
        <div className={props.isNavbarExpand === "true" ? "navbar-right active" : "navbar-right"}>
            <ul className="navbar-item">
                {
                    props.user.role === 0 ? navbarAdminItem.map((item, index)=>{
                        if(item[0] === "no"){
                            return(
                                <li key={index}>
                                    <div className={history.location.pathname === item[3] ? "link active" : "link"} onClick={handleClick} data-index={index} >
                                        <i className={item[1]}></i> <span>{item[2]}</span> 
                                    </div>
                                </li>
                            )
                        }
                        return(
                            <li key={index}>
                                <div onClick={handleDropdownLinkClick} className={checkIsInsideDropDown(index) >= 0 ? "link active" : "link"} id={"dropdowns-" + index}>
                                    <i className={item[1]} ></i> <span>{item[2]}</span> 
                                </div>
                                <div className="dropdown-item">
                                    <ul>
                                        {item[4].map((item2, index2)=>{
                                            return (
                                                <li className={checkIsInsideDropDown(index) === index2 ? "active-dropdown" : ""}  onClick={handleClickDrodpownItem} data-target={index} data-index={index2} key={index2}>
                                                    <i className={item2[0]}></i> <span>{item2[1]}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                        )
                    }) : navbarItem.map((item, index)=>{
                        if(item[0] === "no"){
                            return(
                                <li key={index}>
                                    <div className={history.location.pathname === item[3] ? "link active" : "link"} onClick={handleClick} data-index={index} >
                                        <i className={item[1]}></i> <span>{item[2]}</span> 
                                    </div>
                                </li>
                            )
                        }
                        return(
                            <li key={index}>
                                <div onClick={handleDropdownLinkClick} className={checkIsInsideDropDown(index) >= 0 ? "link active" : "link"} id={"dropdowns-" + index}>
                                    <i className={item[1]} ></i> <span>{item[2]}</span> 
                                </div>
                                <div className="dropdown-item">
                                    <ul>
                                        {item[4].map((item2, index2)=>{
                                            return (
                                                <li className={checkIsInsideDropDown(index) === index2 ? "active-dropdown" : ""}  onClick={handleClickDrodpownItem} data-target={index} data-index={index2} key={index2}>
                                                    <i className={item2[0]}></i> <span>{item2[1]}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
const reduxState = (state) => (
    {
        isLogin: state.isLogin,
        isNavbarExpand: state.isNavbarExpand,
        user: state.user
    }
)
const reduxDispatch = (dispatch) => ({
    changeExpandNavbar: (condition) =>dispatch(changeExpandNavbar(condition)), 
})
export default connect(reduxState, reduxDispatch)(RightNavbar)