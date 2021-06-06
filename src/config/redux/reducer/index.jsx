const initialState = {
    isLogin: localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") : false,
    isLoading: false,
    isNavbarExpand: localStorage.getItem("isExpand") !== undefined ? localStorage.getItem("isExpand") : false,
    dosens: [],
    notif: [],
    token: [],
    dosen_searched: {},
    dosen_view: {},
    dosen_edited: localStorage.getItem("dosen_edited") ? JSON.parse(localStorage.getItem("dosen_edited")) : {},
    user: localStorage.getItem("isLogin") ? JSON.parse(localStorage.getItem("isLogin")).user : {},
    profile: localStorage.getItem("blob-img") ? localStorage.getItem("blob-img") : ""
}
const reducer = (state = initialState, action) => {
    if (action.type === 'CHANGE_LOGIN') {
        return {
            ...state,
            isLogin: action.value
        }
    }
    if (action.type === 'CHANGE_DOSEN_VIEW') {
        return {
            ...state,
            dosen_view: action.value
        }
    }
    if (action.type === 'CHANGE_PROFILE') {
        return {
            ...state,
            profile: action.value
        }
    }
    if (action.type === 'CHANGE_SEARCHED') {
        let result = state.dosen_searched
        result[action.key] = action.value
        return {
            ...state,
            dosen_searched: result
        }
    }
    if (action.type === 'CHANGE_TOKEN') {
        return {
            ...state,
            token:  [...new Set(action.value.concat(state.token).map(o => JSON.stringify(o)))].map(s => JSON.parse(s)) 
        }
    }
    if(action.type === "UPDATE_TOKEN"){
        let data = state.token
        let find = data.findIndex((item)=>{return item._id === action.value._id})
        console.log(find);
        if(find !== false){
            data[find]._id = action.value._id
            data[find].expired_at = action.value.tanggal
            data[find].status = "Menunggu"

            console.log(data[find])
        }
        return{
            ...state,
            token: data
        }
    }
    if (action.type === 'CHANGE_TOKEN_VALUE') {
        return {
            ...state,
            token: action.value
        }
    }
    if(action.type === 'REMOVE_NOTIF'){
        let data = state.notif
        let find = data.findIndex((data)=>{return data._id === action.value})
        data.splice(find, 1)
        return{
            ...state,
            notif: data
        }
    }
    if (action.type === 'CHANGE_NOTIF') {
        return {
            ...state,
            notif: [...new Set(state.notif.concat(action.value).map(o=> JSON.stringify(o)))].map(item=> JSON.parse(item))
        }
    }
    if (action.type === 'CHANGE_USER') {
        return {
            ...state,
            user: action.value
        }
    }
    if (action.type === 'CHANGE_NAVBAR_EXPAND') {
        return {
            ...state,
            isNavbarExpand: action.value
        }
    }
    if (action.type === 'CHANGE_LOADING') {
        return {
            ...state,
            isLoading: action.value
        }
    }
    if (action.type === 'CHANGE_DATA_INTERVAL') {
        return {
            ...state,
            dosens: action.value
        }
    }
    return state
}
export default reducer