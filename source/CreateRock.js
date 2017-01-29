import {connect } from 'react-redux'
import {whoami, postRocks, putFiles} from './actions'
import React, {Component} from 'react';
import {Link} from 'react-router';
import MyNavBar from './MyNavBar'
import DropzoneComponent from 'react-dropzone-component'
import {Alert, Spinner, Toaster, IToaster, Intent, EditableText} from '@blueprintjs/core'
import ProfileImage from './ProfileImage'
import {youtube_parser} from './Youtube'

class CreateRock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      youtube: "",
      author: this.props.me.id,
      isUploaded: false,
      isSpin: false,
      isOpenDeleteAlert: false,
    }
    this.mySubmit = this.mySubmit.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.textChange = this.textChange.bind(this)
    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: false,
      acceptedFiles: 'image/*',
      maxFiles: 1,
      dictDefaultMessage: ''
    }
    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: false,
      postUrl: '#',
    }
    this.props.whoami()
    .then(  () => {
      this.setState({author: this.props.me.id})
    })
  }

  componentWillMount() {
    this.toaster = Toaster.create()
  }
 

  fetchPutImage(files) {
    this.setState({isSpin: true})
    this.props.putFiles(files)
    .then(json => {
      if (json !== 500) { //success
        this.setState({isSpin: false})
        this.setState({attached_image: json.url})
        this.setState({isUploaded: true})
      }
    })
  }

  mySubmit() {
    this.setState({isSpin: true})
    this.props.postRocks(this.state)
    .then(res => {
      this.setState({isSpin: false})
      if(res === 201) {  //success
        this.toaster.show({
         className: "toaster-success",
         timeout: 1000,
         message: "완료"
       })
       this.context.router.push('/')
     }
    })
  }
  onOpenClick() {
  }
  titleChange(text) {
    this.setState({title: text})
  }
  textChange(text) {
    !this.state.isUploaded && this.setState({youtube: this.youtube_parser(text)})
    this.setState({text})
  }
  imageClicked() {
    this.setState({isOpenDeleteAlert: true})
  }
  handleDeleteClose() {
    this.setState({isOpenDeleteAlert: false})
    this.setState({isUploaded: false})
    this.setState({attached_image: null})
  }
  handleClose() {
    this.setState({isOpenDeleteAlert: false})
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.fetchPutImage.bind(this)
    }
              //<span className='attach-image-icon pt-icon-large pt-icon-media' />
    return (
      <div>
        <MyNavBar />
        <div className="container">
          {this.state.isSpin && <Spinner className="loading"/>}
        <div className="card create-rock">
          <Alert
            isOpen={this.state.isOpenDeleteAlert}
            intent={Intent.DANGER}
            confirmButtonText="삭제"
            cancelButtonText="취소"
            onConfirm={this.handleDeleteClose.bind(this)}
            onCancel={this.handleClose.bind(this)}>
            <h6> 정말 지워요? </h6>
          </Alert>
          <form>
            <div className="card-block"> 
              <EditableText 
                className="create-rock-title"
                placeholder="제목"
                value={this.state.title}
                onChange={this.titleChange}
              />
            </div>
            {
            this.state.youtube ?
            <div className="card-block">
              <div className="read-rock-youtube-wrapper">
                <iframe
                  className="read-rock-youtube"
                  src={`https://www.youtube.com/embed/${this.state.youtube}`}
                  frameBorder="0" 
                  allowFullScreen></iframe>
              </div>
            </div>
            :
            this.state.isUploaded ? 
            <div onClick={this.imageClicked.bind(this)}>
              <ProfileImage
                wrapperClass="card-img-top read-rock-image-wrapper create-rock-img-wrapper"
                imgClass="img-fluid rock-image"
                imgId={this.state.attached_image}
              />
            </div>
            :
            <div className="attach-image form-group card-block"> 
              <DropzoneComponent className="create-rock-attach pt-icon-large pt-icon-important pt-icon-media" config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} /> 
            </div>
            }
            <div className="card-block"> 
              <EditableText
                placeholder="오늘은 무슨 일이야?"
                multiline
                minLines={3}
                maxLines={12}
                value={this.state.text}
                className="create-rock-textarea"
                onChange={this.textChange}
              />
            </div>
            <div className="card-block text-xs-right">
                <button type="button" className="pt-button pt-intent-primary create-rock-submit" onClick={this.mySubmit}> 게시  </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    )
  }
}

CreateRock.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})

const mapDispatchToProps = ({
  putFiles,
  whoami,
  postRocks
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRock)
