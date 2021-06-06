import Axios from 'axios'
import { APIBASE } from '../../constants'
Axios.defaults.baseURL = APIBASE
export const changeLogin = (value) => {
    return (dispatch) => {
        return dispatch({ type: "CHANGE_LOGIN", value: value })
    }
}
export const actionChangeToken = (data)=>{
    return (dispatch)=>{
        return dispatch({type: "UPDATE_TOKEN", value: data.message})
    }
}
export const changeUser = (data) => {
    return (dispatch) => {
        return dispatch({ type: "CHANGE_USER", value: data })
    }
}
export const changeNotif = (data) => {
    return (dispatch) => {
        return dispatch({ type: "CHANGE_NOTIF", value: data })
    }
}
export const changeTokenProps = (index, data, confirmation) =>{
    return (dispatch)=>{
        data[index].status = confirmation
        dispatch({ type: "CHANGE_TOKEN_VALUE", value: data })
    }
}
export const changeExpandNavbar = (condition) => {
    return (dispatch) => {
        return dispatch({ type: "CHANGE_NAVBAR_EXPAND", value: condition })
    }
}
export const actionGetJabatanActive = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.get("dosen/jabatan/active", {})
            .then(result => {
                resolve(result.data.data)
            })
            .catch(err => {
                reject([])
            })
    })
}
export const actionGetPendidikanActive = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.get("dosen/pendidikan/active", {})
            .then(result => {
                resolve(result.data.data)
            })
            .catch(err => {
                reject([])
            })
    })
}
export const actionSendTokenData = (data, cancelToken) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post("/request/take", data, {
            cancelToken: cancelToken
        }).then(result => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data.result)
        }).catch(err => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}
export const actionSearchDosenBYHRD = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post("/employees/search/complex", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            if(result.data.result.length > 0){
                dispatch({type: "CHANGE_SEARCHED",key: JSON.stringify(data),value: result.data.result})
                resolve(true)
            }else{
                reject(false)
            }
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}
export const actiontakeAllToken = (offset, limit) => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.get("/request/all/" + offset + "/" + limit, {
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
            .then(result => {
                let x = result.data.result
                x.sort((a, b) => { return new Date(b.expired_at) - new Date(a.expired_at) })
                // console.log(x)
                dispatch({ type: "CHANGE_TOKEN", value: x })
                resolve(true)
            })
            .catch(err => {
                reject(err.response)
            })
    })
}
export const getAllNotif = (offset, idUser) => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.get("/notif/all/" + offset + "/" + idUser, {
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
            .then(result => {
                if (result.data.result.length) {
                    dispatch({ type: "CHANGE_NOTIF", value: result.data.result })
                    resolve(result.data.result)
                } else {
                    reject(false)
                }
            }).catch(err => {
                reject(false)
            })
    })
}
export const actionSendRequestData = (data, cancelToken) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post("/request/send", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result)
        }).catch(err => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}
export const actionRefreshToken = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        Axios.post('/users/token/refresh',data, {
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).refresh_token
            }
        }).then(res => {
            var user_temp = JSON.parse(localStorage.getItem("isLogin"))
            user_temp.token = res.data.new_token
            localStorage.setItem("isLogin", JSON.stringify(user_temp))
            resolve(true)
        }).catch(err => {
            dispatch({ type: "CHANGE_NOTIF", value: [] });
            dispatch({ type: "CHANGE_LOGIN", value: false });
            dispatch({ type: "CHANGE_PROFILE", value: "" });
            dispatch({ type: "CHANGE_USER", value: {} });
            reject(false)
        })
    })
}

export const actionUpdate = (data, cancelToken) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        console.log(data)
        Axios.put("/users/update", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(res => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            if (res.status === 200) {
                var user_temp = JSON.parse(localStorage.getItem("isLogin"))
                user_temp.user.no_telepon = data.phone_number
                user_temp.user.private_email = data.private_email
                user_temp.user.full_name = data.full_name
                dispatch({ type: "CHANGE_USER", value: user_temp.user })
                localStorage.setItem("isLogin", JSON.stringify(user_temp))
                resolve(true)
            } else {
                reject(false)
            }
        }).catch(err => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}

export const actionSearchDosen = (key, cancelToken) => (dispatch) => {
    let send = { key: key }
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post('/employees/search/simple', send, {
            cancelToken: cancelToken
        })
            .then(result => {
                dispatch({ type: "CHANGE_LOADING", value: false })
                if (result.status === 200) {
                    if (localStorage.getItem("search-history")) {
                        let before = localStorage.getItem("search-history").split(",")
                        if (!before.includes(key.toLowerCase())) {
                            localStorage.setItem("search-history", before.join(",") + "," + key)
                        }
                    } else {
                        localStorage.setItem("search-history", key.toLowerCase())
                    }
                    resolve(result.data.result)
                } else {
                    sessionStorage.setItem("isNotFound", "Data Not Found")
                    reject([])
                }
            }).catch(err => {
                dispatch({ type: "CHANGE_LOADING", value: false })
                reject([])
            })
    })
}
export const actionLogOut = () => (dispatch) => {
    dispatch({ type: "CHANGE_NOTIF", value: [] })
    dispatch({ type: "CHANGE_LOGIN", value: false })
    dispatch({ type: "CHANGE_PROFILE", value: "" })
    dispatch({ type: "CHANGE_USER", value: {} })
}
export const actionLoginApi = (data) => (dispatch) => {
    let send = { email: data.email, password: data.password }
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post('/users/login', send, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => {
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_LOGIN", value: true })
                const dataUser = {
                    user: res.data.result,
                    token: res.data.token,
                    refresh_token: res.data.refresh_token
                }
                if (sessionStorage.getItem("isError")) {
                    sessionStorage.removeItem("isError")
                }
                localStorage.setItem('isLogin', JSON.stringify(dataUser))

                dispatch({ type: "CHANGE_USER", value: dataUser.user })
                send.email = ""
                send.password = ""
                fetch(APIBASE + res.data.result.profile)
                    .then(result => {
                        result.blob().then(blob => {
                            const reader = new FileReader();
                            reader.readAsDataURL(blob);
                            reader.onloadend = () => {
                                dispatch({ type: "CHANGE_PROFILE", value: reader.result })
                                localStorage.setItem("blob-img", reader.result)
                                resolve(true)
                            }
                        })
                    })
            }).catch((err) => {
                if (err.response) {
                    dispatch({ type: "CHANGE_LOGIN", value: false })
                    if (err.response.status === 404) {
                        sessionStorage.setItem('isError', "Email yang anda masukkan salah !")
                    } else if (err.response.status === 401) {
                        sessionStorage.setItem('isError', "Password yang anda masukkan salah !")
                    }
                }
                dispatch({ type: "CHANGE_LOADING", value: false })
                dispatch({ type: "CHANGE_LOGIN", value: false })
                reject(false)
            })
    })
}
export const actionChangeProfileDefault = (data, cancelToken) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/users/profile/update/default", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result => {
            fetch(APIBASE + result.data.profile)
                .then(result => {
                    result.blob().then(blob => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {
                            localStorage.setItem("blob-img", reader.result)
                            dispatch({ type: "CHANGE_PROFILE", value: reader.result })
                            dispatch({ type: "CHANGE_LOADING", value: false })
                            resolve(reader.result)
                        }
                    })
                })
        }).catch(err => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}
export const actionChangePorfileUser = (data, cancelToken) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/users/profile/update", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result => {
            fetch(APIBASE + result.data.profile)
                .then(result => {
                    result.blob().then(blob => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {

                        }
                        reader.onloadend = () => {
                            localStorage.setItem("blob-img", reader.result)
                            dispatch({ type: "CHANGE_PROFILE", value: reader.result })
                            dispatch({ type: "CHANGE_LOADING", value: false })
                            resolve(reader.result)
                        }
                    })
                })
        }).catch(err => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}

export const actionConfirmToken = (data, cancelToken) => (dispatch) => {
    dispatch({ type: "CHANGE_LOADING", value: true })
    return new Promise((resolve, reject) => {
        Axios.put("/request/confirm", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result => {
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(true)
        })
            .catch(err => {
                dispatch({ type: "CHANGE_LOADING", value: false })
                reject(err.response)
            })
    })
}
export const actionaddDataPegawaiAPI = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.post("/employees/add", {employees: data}, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}
export const actionGetDosenByID = (idDosen, cancelToken) =>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.get("/employees/" + idDosen,{
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        }).then(result=>{
            dispatch({type: "CHANGE_DOSEN_VIEW", value: result.data.result})
            dispatch({ type: "CHANGE_LOADING", value: false})
            resolve(true)
        })
        .catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(err.response)
        })
    })
}

export const actionReadNotif = (data, cancelToken)=> (dispatch)=>{
    return new Promise((resolve, reject)=>{
        Axios.put("/notif/read", data, {
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({type:"REMOVE_NOTIF", value: data._id})
            resolve(true)
        }).catch(err=>{
            reject(false)
        })
    })
}
export const actionUpdateEmployee = (data, cancelToken)=> (dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/update", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(true)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actiondeleteDosen = (id, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.delete("/employees/" + id, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(true)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actionUploadLampiranLink = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/lampiran/add/link", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(true)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actionUploadLampiranUpload = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/lampiran/add/upload", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actionUploadEmployeeProfileLink = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/profile/link", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(true)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actionUploadEmployeeProfileUpload = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/profile/upload", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}
export const actionDeleteLampiran = (data, cancelToken)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.put("/employees/lampiran/delete", data, {
            cancelToken: cancelToken,
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}

export const actionGetAllUsers=()=>(dispatch)=>{
    return new Promise((resolve, reject)=>{
        dispatch({ type: "CHANGE_LOADING", value: true })
        Axios.get("/users/all",{
            headers: {
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("isLogin")).token
            }
        })
        .then(result=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            resolve(result.data)
        }).catch(err=>{
            dispatch({ type: "CHANGE_LOADING", value: false })
            reject(false)
        })
    })
}