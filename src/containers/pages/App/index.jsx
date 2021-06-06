import { React, Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import { changeLogin, changeNotif, getAllNotif, actiontakeAllToken, actionChangeToken} from '../../../config/redux/action'
import { connect } from 'react-redux';
import Login from '../Login';
import channel from '../../../config/pusher';
import PrivateRoute from '../../../components/molekuls/PrivateRoute'
import RigthNavbar from '../../../components/atoms/RightNavbar'
import Dashboard from '../Dashboard'
import NavbarTop from '../../../components/atoms/NavbarTop'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  handleClick = () => {
    this.props.changeLogin()
  }
  componentDidMount = () => {
    if(this.props.isLogin){
      if(this.props.token.length <= 0){
        this.handleTakeToken()
      }
      this.handleRekursifNotif()
      channel.bind('req-token', (data)=>{
        this.handleRekursifNotif()
        this.handleTakeToken()
        console.log("calling")
      });
      channel.bind('req-token-update', (data)=>{
        this.handleRekursifNotif()
        this.props.updateRequestToken(data)
      });
    }
    document.addEventListener("mousedown", this.handleOnClickNode, false)
  }
  handleRekursifNotif = async () =>{
    if(this.props.isLogin){
      this.props.getAllNotif(this.props.notif ? this.props.notif.length : 0, this.props.user._id)
      .then(result=>{
      })
      .catch(err=>{
       console.log(err)
      })
    }

  }
  handleTakeToken = () => {
    this.props.getAllToken(this.props.token ? this.props.token.length : 0, 6)
        .then(result => {
            this.handleTakeToken(this.props.token ? this.props.token.length : 0, 6)
        }).catch(err => {
            console.log(err)
        })
  }
  componentWillUnmount = () => {
    sessionStorage.clear();
    document.removeEventListener("mousedown", this.handleOnClickNode, false)
  }

  handleOnClickNode = (event) => {
    if (document.getElementById("pop-profile") !== null) {
      if (!document.getElementById("pop-profile").contains(event.target)) {
        document.getElementById("pop-profile").classList.remove("active")
        document.getElementById("profile-trigger").classList.remove("active")
      }
    }
    if (document.getElementById("notifikasi") !== null) {
      if (!document.getElementById("notifikasi").contains(event.target)) {
        document.getElementById("notifikasi").classList.remove("active")
        document.getElementById("notifikasi-trigger").classList.remove("active")
      }
    }
  }
  render() {
    return (
      <Router>
        <Switch>
        <Route path='/login' exact component={(props)=><Login {...props} notifCheck={this.handleRekursifNotif} tokenCheck={this.handleTakeToken}/>}></Route>
        <Fragment>
            <div className="container">
              <NavbarTop></NavbarTop>
              <div className="section-flex-row">
                <RigthNavbar></RigthNavbar>
                <Switch>
                  <PrivateRoute exact path='/'>
                    <Dashboard></Dashboard>
                  </PrivateRoute>
                </Switch>
              </div>
            </div>
          </Fragment>
        </Switch>
      </Router>
    )
  }
}
const reduxState = (state) => (
  {
    isLogin: state.isLogin,
    notif: state.notif,
    token: state.token,
    user: state.user,
  }
)
const reduxDispatch = (dispatch) => ({
  changeLogin: () => dispatch(changeLogin()),
  getAllNotif: (data, idUser) => dispatch(getAllNotif(data, idUser)),
  changeNotif: (data) => dispatch(changeNotif(data)),
  getAllToken: (offset, limit)=>dispatch(actiontakeAllToken(offset, limit)),
  updateRequestToken: (data)=>dispatch(actionChangeToken(data))
})
export default connect(reduxState, reduxDispatch)(App);
