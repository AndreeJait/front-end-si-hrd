import {React} from 'react'
import icon from '../../../assets/img/icon/loading-button.gif'
import './index.css'
const ButtonLoading = (props) =>{
    if(props.isLoading){
        return (
                <button className="mt-20 btn btn-disabled w-100"><img src={icon} alt="Loading..."/>{props.msg_loading}</button>
            )
    }else{
        return (
                <button onClick={props.onClick} className="mt-20 btn btn-success w-100">{props.text}</button>
            )
    }
}

export default ButtonLoading