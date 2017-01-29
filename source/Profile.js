import React, {Component} from 'react'
import {patchMembers, whoami, putFiles} from './actions'
import {connect} from 'react-redux'
import MyNavBar from './MyNavBar'
import ProfileImage from './ProfileImage'
import DropzoneComponent from 'react-dropzone-component'
import {renderToStaticMarkup}  from 'react-dom/server'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile_image: "",
      last_name: "",
      password: "",
      passwordConfirm: "",
      phone_number: "",
      isPasswordAlert: false,
      isPasswordConfirmAlert: false,
      isPhonenumberAlert: false,
    }
    this.props.whoami()
    .then(res =>  this.setState({
      id: this.props.me.id,
      last_name: this.props.me.last_name
      })
    )
    this.djsConfig = {
      previewTemplate: renderToStaticMarkup(<div> </div>),
      addRemoveLinks: false,
      autoProcessQueue: false,
      acceptedFiles: 'image/*',
      maxFiles: 1,
      dictDefaultMessage: 'aaa',
      maxFilesize: 2,           //MiB
    }
    this.componentConfig = {
      postUrl: '#'
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation();
    if(this.state.password === "" ) {
      this.setState({isPasswordAlert: true})
      return;
    }
    if(this.state.passwordConfirm === "" ) {
      this.setState({isPasswordConfirmAlert: true})
      return;
    }
    (this.state.password !== "" && !this.state.isPasswordAlert) && 
      !this.isPasswordConfirmAlert && 
      (this.state.phone_number === "" || !this.state.isPhonenumberAlert) && 
      this.props.patchMembers(this.state)
      .then(res => {
        if(res === 200){
          this.context.router.push('/brand')
        }
      })
  }
  onPasswordBlur(event) {
    var password = event.target.value.toString()
    if(!password || password.length < 8){
      this.setState({isPasswordAlert: true})
    }
    else {
      this.setState({isPasswordAlert: false})
      this.setState({password})
    }
  }
  onPasswordConfirmBlur(event) {
    var passwordConfirm = event.target.value.toString()
    if(!passwordConfirm.trim() || passwordConfirm !== this.state.password) {
      this.setState({isPasswordConfirmAlert: true})
    }
    else {
      this.setState({isPasswordConfirmAlert: false})
      this.setState({passwordConfirm})
    }
  }

  onPhonenumberCheck(event) {
    var phone_number = event.target.value.toString()
    this.setState({phone_number})
    if(phone_number.match(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/)){
      this.setState({isPhonenumberAlert: false})
    }
    else {
      this.setState({isPhonenumberAlert: true})
      return false
    }
  }
  fetchPutImage(file) {
    this.props.putFiles(file)
    .then(json => {
      if(json !== 500) {
        this.setState({profile_image: json.id})
      }
    })
  }
  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: file => this.fetchPutImage(file)
    }
    return (
      <div>
        <MyNavBar />
        <div className="container">
        <form encType='application/json'
          onSubmit={e => this.handleSubmit(e)}>
          <div className="create-rock card">
            <div className="card-block">
              <h4 className="card-title"> 프로필 변경 </h4>
            </div>
            <div className="card-block">
              <div className="club-join-form">
                <strong> 프로필 이미지 </strong>
              { this.props.me.profile_image &&
              <div className="my-account-profile-image-wrapper">
                <ProfileImage
                  imgClass="my-account-profile-image"
                  wrapperClass=""
                  imgId={this.state.profile_image !== "" ? this.state.profile_image :
                    this.props.me.profile_image}
                />
                <DropzoneComponent
                  className="my-account-dropzone"
                  config={config}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig} />
               </div>
               }
              </div>
              <div className="club-join-form">
                <strong> 이름 </strong>
                <input type="text" 
                  name="last_name"
                  className="club-join-input pt-input .modifier"
                  placeholder={this.props.me.last_name}
                  defaultValue={this.props.me.last_name}
                  onChange={e => this.setState({last_name: e.target.value})}
                />
              </div>
              <div className="club-join-form">
                <strong> 비밀번호 </strong>
                <input type="password" 
                  name="password"
                  className="club-join-input pt-input .modifier"
                  onBlur={e => this.onPasswordBlur(e)}
                />
                {this.state.isPasswordAlert &&
                  <span role="alert" className="club-join-input-error"> <small>
                    입력해주세요(8자이상) </small> </span>}
              </div>
              <div className="club-join-form">
                <strong> 비밀번호(재입력) </strong>
                <input type="password" 
                  className="club-join-input pt-input .modifier"
                  onBlur={e => this.onPasswordConfirmBlur(e)}
                />
                {this.state.isPasswordConfirmAlert &&
                  <span role="alert" className="club-join-input-error"> <small>
                    비밀번호가 다릅니다 </small> </span>}
              </div>
              <div className="club-join-form">
                <strong> 연락처 </strong>
                <input type="text"
                  name="phone_number"
                  className="club-join-input pt-input .modifier"
                  placeholder={this.props.me.phone_number}
                  defaultValue={this.props.me.phone_number}
                  onBlur={e => this.onPhonenumberCheck(e)}
                  />
                {this.state.isPhonenumberAlert &&
                  <span role="alert" className="club-join-input-error"> <small>
                    NoNoNo </small> </span>}
              </div>
            </div>   {/*-- card-block */}
            <div className="card-block text-xs-right">
              <button type="submit" className="pt-button pt-intent-primary create-rock-sumbit">
                수정(로그아웃됩니다)
              </button>
            </div>
          </div>
          </form>
        </div> 
      </div>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})
const mapDispatchToProps = ({
  whoami,
  putFiles,
  patchMembers
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
