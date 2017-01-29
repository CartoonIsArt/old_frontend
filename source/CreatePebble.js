import React, {Component} from 'react'
import {connect} from 'react-redux'
import {whoami, postRocks, putFiles} from './actions'
import DropzoneComponent from 'react-dropzone-component'
import {Intent, Alert, Toaster, IToaster, EditableText} from '@blueprintjs/core'
import ProfileImage from './ProfileImage'
import {youtube_parser} from './Youtube'

class CreatePebbles extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      youtube: "",
      author: this.props.me.id,
      parent_rock: this.props.rockId,
      isUploaded: false,
      isOpenDeleteAlert: false,
    }
    this.props.whoami()
    .then( () => {
      this.setState({author: this.props.me.id})
    })
    this.mySubmit = this.mySubmit.bind(this)
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
  }
  componentWillMount() {
    this.toaster = Toaster.create()
  }

  fetchPutImage(files) {
    this.props.putFiles(files)
    .then(json => {
      if (json !== 500) { //success
        this.setState({attached_image: json.url})
        this.setState({isUploaded: true})
      }
    })
  }

  mySubmit() {
    this.props.postRocks(this.state, true)
    .then(res => {
      if (res === 201) {
        this.handleDeleteClose()
        this.setState({text: ''})
      }
    })
  }
  textChange(text) {
    !this.state.isUploaded && this.setState({youtube: youtube_parser(text)})
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
    const config = this.componentConfig
    const djsConfig = this.djsConfig
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.fetchPutImage.bind(this)
    }

    return (
      <div className="card write-pebble">
        <Alert
          isOpen={this.state.isOpenDeleteAlert}
          intent={Intent.DANGER}
          confirmButtonText="삭제"
          cancelButtonText="취소"
          onConfirm={() => this.handleDeleteClose()}
          onCancel={() => this.handleClose() }>
          <h6> 정말 지워요? </h6>
        </Alert>
        <form>
        {
        this.state.youtube ?
        <div className="card-block">
          <div className="read-rock-youtube-wrapper">
            <iframe
              className="read-rock-youtube"
              src={`https://www.youtube.com/embed/${this.state.youtube}`}
              frameBorder="0"
              allowFullScreen> </iframe>
          </div>
        </div>
        :
        this.state.isUploaded ?
        <div onClick={() => this.imageClicked()}>
          <ProfileImage
            wrapperClass="card-img-top read-rock-image-wrapper create-rock-img-wrapper"
            imgClass="img-fluid rock-image"
            imgId={this.state.attached_image}
          />
        </div>
        :
          <div className="attach-image form-group card-block">
            <DropzoneComponent
              className="create-rock-attach pt-icon-important pt-icon-media"
            config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
          </div>
        }
          <div className="card-block">
            <EditableText
              placeholder="more..."
              multiline
              minLines={3}
              maxLines={12}
              value={this.state.text}
              classNmae="create-rock-textarea"
              onChange={this.textChange}
            />
            <button type="button" className="pt-button pt-intent-primary create-rock-submit" onClick={this.mySubmit}> 이어쓰기 </button>
          </div>
        </form>
      </div>
    )
  }
}

CreatePebbles.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state =>  ({
  me: state.me
})

const mapDispatchToProps = ({
  putFiles,
  whoami,
  postRocks
})



export default connect(mapStateToProps, mapDispatchToProps)(CreatePebbles)
