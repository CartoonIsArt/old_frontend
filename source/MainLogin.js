import React, { Component } from 'react';
import {connect } from 'react-redux'
import {login} from './actions'
import {Link} from 'react-router';
import {Alert, Toaster, IToaster, Intent} from '@blueprintjs/core'
import {host} from './Configure'

class MainLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnonuser: false
    }
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.mySubmit = this.mySubmit.bind(this)
  }
  componentWillMount() {
    this.toaster = Toaster.create()
  }

  mySubmit(e) {
    this.props.login(this.state)
    .then(res => {
      if (res === 200){
        this.toaster.show({
          className: "toaster-success",
          timeout: 1000,
          message: "환영합니다!"
        })
        this.context.router.push('/')
      }
      else if (res === 401) {  // anon user
        this.setState({isAnonuser: true})
      }
      else {
        this.toaster.show({
          className: "toaster-fail",
          timeout: 1000,
          message: "ID나 Password가 올바르지 않습니다"
        })
        document.getElementById("1").focus()
      }
    })
    e.preventDefault()
  }
  usernameChange(event) {
    this.setState({username: event.target.value})
  }
  passwordChange(event) {
    this.setState({password: event.target.value})
  }
  componentDidMount() {
    document.body.style.backgroundImage=`url('${host}/static/background.jpg')`
  }
  componentWillUnmount() {
    document.body.style.backgroundImage="url('')"
  }
  render() {
    return (
    <div>
      <Alert
        isOpen={this.state.isAnonuser}
        confirmButtonText="확인"
        onConfirm={() => this.setState({isAnonuser: false})}
      >
        <p> 님 계정 아직 인증안함 ㄱㄷ </p>
      </Alert>
      <div className="my-login">
      <form onSubmit={this.mySubmit}>
        <div className="pt-control-group pt-vertical">
          <div className="pt-input-group pt-large">
            <span className="pt-icon pt-icon-person"></span>
            <input id="1" tabIndex="1" type="text" className="pt-input" placeholder="Username" 
              onChange={this.usernameChange}  
              autoFocus />
          </div>
          <div className="pt-input-group pt-large">
            <span className="pt-icon pt-icon-lock"></span>
            <input tabIndex="2" type="password" className="pt-input" placeholder="Password" 
              onChange={this.passwordChange} />
          </div>
          <button type="submit" id="2" tabIndex="3" className="pt-button pt-large pt-intent-primary"> 로그인 </button>
        </div>
      </form>
      <button className="pt-button pt-large pt-color-muted" style={{width: "100%"}}
        onClick={() => window.scrollTo(0,document.body.scrollHeight) }
        > 회원가입 </button>
      <button className="pt-button pt-large pt-color-muted" style={{width: "100%"}}
        onClick={() => document.location="http://128.134.57.197"}
      > 구동게로 </button>
      </div>
    </div>
    );
  }
}


MainLogin.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = ({
  login
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLogin)
