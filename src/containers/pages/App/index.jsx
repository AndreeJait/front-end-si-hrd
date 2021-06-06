import { React, Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Switch } from 'react-router-dom'
import { connect } from 'react-redux';
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
    
  }
  componentWillUnmount = () => {

  }

  handleOnClickNode = (event) => {

  }
  render() {
    return (
      <Router>
        <Switch>
          <p>Running</p>
        </Switch>
      </Router>
    )
  }
}
const reduxState = (state) => (
  {

  }
)
const reduxDispatch = (dispatch) => ({

})
export default connect(reduxState, reduxDispatch)(App);
