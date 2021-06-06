import {React} from 'react'
import {Route, Redirect, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import { isExpired } from 'react-jwt'
import {actionRefreshToken} from '../../../config/redux/action'
const PrivateRoute = ({actionRefreshToken,component: Component, children, ...rest}) =>{
    let history = useHistory();
    var isTokenExpired = true;
    var isRefreshTokenExpired = true;
    if(localStorage.getItem("isLogin")){
        isTokenExpired = isExpired(JSON.parse(localStorage.getItem("isLogin")).token);
        isRefreshTokenExpired = isExpired(JSON.parse(localStorage.getItem("isLogin")).refresh_token) ;
    }
    const refreshToken = async () =>{
        let user = {email: JSON.parse(localStorage.getItem("isLogin")).user.email};
        const result = await actionRefreshToken(user).catch(err=>err);
        if(result){
            return true;
        }else{
            throw Error("Gagal melakukan refresh");
        }
    }
    return (
        <Route {...rest}render={(props) => {
            if(localStorage.getItem("isLogin")){
                if(isTokenExpired ){
                    if(isRefreshTokenExpired){
                        alert("Session telah habis harap login kembali !");
                        localStorage.removeItem("isLogin");
                        localStorage.clear();
                        sessionStorage.clear();
                        history.push("/login");
                        return <Redirect to="/login"></Redirect>
                    }else{
                        refreshToken().then(result=>{ 
                        }).catch(err=>{
                            alert("Session telah habis harap login kembali !");
                            localStorage.removeItem("isLogin");
                            localStorage.clear();
                            sessionStorage.clear();
                            history.push("/login");
                            return <Redirect to="/login"></Redirect>
                        })
                    }
                }   
                return Component ? <Component {...props} />  : children 
            }
            return <Redirect to="/login"></Redirect>
        }}></Route>
    )
}
const reduxState = (state) => (
    {
        isLogin: state.isLogin,
    }
)
const reduxDispatch = (dispatch) => ({
    actionRefreshToken: async (data) => dispatch(actionRefreshToken(data))
})
export default connect(reduxState, reduxDispatch)(PrivateRoute);