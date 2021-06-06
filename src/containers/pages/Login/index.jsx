import { React, Component } from "react"
import { connect } from 'react-redux'
import logo from '../../../assets/img/logo/logo.jpg'
import './index.css'
import InputCustom from '../../../components/atoms/InputCustom'
import ButtonLoading from '../../../components/atoms/ButtonLoading'
import { actionLoginApi, actiontakeAllToken, changeNotif, getAllNotif } from '../../../config/redux/action'
import {Link} from 'react-router-dom'
import channel from "../../../config/pusher"
class Login extends Component {
  constructor(props) {
    super(props)
    if (localStorage.getItem("isLogin")) {
      const { history } = props
      history.push("/")
    }
    this.state = {
      form: {
        email: "",
        password: "",
        isValidpassword: false,
        isValidemail: false,
      }
    }
  }
  handleChange = (data) => {
    var tempForm = this.state.form
    tempForm[data.name] = data.value
    var validName = "isValid" + data.name
    tempForm[validName] = data.valid
    this.setState({
      form: tempForm
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    const { history } = this.props
    if (this.state.form.isValidemail && this.state.form.isValidpassword) {
      const result = await this.props.actionLoginApi(this.state.form).catch(err => err)
      if (result) {
        this.props.tokenCheck()
        this.props.notifCheck()
        channel.bind('req-token', (data)=>{
          this.props.tokenCheck()
          this.props.notifCheck()
        });
        history.push("/")
        return result
      }
      else {
        return Error("Tidak dapat melanjutkan")
      }
    }
  }

  componentDidMount = () => {

  }
  componentWillUnmount() {
    var tempForm = {
      email: "",
      password: "",
      isValidpassword: false,
      isValidemail: false,
    }
    this.setState({
      form: tempForm
    })
  }
  render() {
    return (
      <div className="box-login">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
          <h5>Sistem Informasi HRD <br/>IT Del</h5>
          <hr className="green"/>
        </div>
        {sessionStorage.getItem("isError") && <p className="p-error">{sessionStorage.getItem("isError")}</p>}
       <form onSubmit={this.handleSubmit}>
        <InputCustom onChange={this.handleChange} validate="yes,yes" type="email" name="email" text="Email"></InputCustom>
          <InputCustom onChange={this.handleChange} validate="yes,yes" type="password" name="password" text="Password"></InputCustom>
          <ButtonLoading isLoading={this.props.isLoading} validate="yes,yes" text="Login" msg_loading="Sedang melakukan Authentikasi" onClick={this.handleSubmit}></ButtonLoading>
       </form>
       <div className="setting">
        <Link to='/data' className="link mt-2">Lihat data berdasarkan token</Link>
       </div>
      </div>
    )
  }
}

const reduxState = (state) => (
  {
    isLogin: state.isLogin,
    isLoading: state.isLoading,
    user: state.user,
    notif: state.notif,
    token: state.token
  }
)
const reduxDispatch = (dispatch) => ({
  actionLoginApi: (data) => dispatch(actionLoginApi(data)),
  getAllNotif: (data, idUser) => dispatch(getAllNotif(data, idUser)),
  changeNotif: (data) => dispatch(changeNotif(data)),
  getAllToken: (offset, limit)=>dispatch(actiontakeAllToken(offset, limit))
})
export default connect(reduxState, reduxDispatch)(Login)