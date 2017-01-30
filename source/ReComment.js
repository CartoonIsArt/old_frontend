import React, {Component} from 'react'
import {Toaster, IToaster, Intent, Alert, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import {connect} from 'react-redux'
import {deleteComments, getMembers} from './actions'
import ProfileImage from './ProfileImage'
import moment from 'moment'
import Linkify from 'react-linkify'

class ReComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpenAlert: false
    }
    this.props.members.filter(e => e.id == this.props.author).length === 0 &&
    this.props.getMembers(this.props.author)
  }

  componentWillMount() {
    this.toaster = Toaster.create()
  }

  toggleCreateReComment(e) {
    e.preventDefault()
    this.setState({isCreateRecommentOn: !this.state.isCreateRecommentOn})
  }
  
  toggleReComment(e) {
    this.setState({isRecommentOn: !this.state.isRecommentOn})
  }

  deleteEvent(e) {
    this.setState({isOpenAlert: true})
  }

  handleDeleteClose(){
    this.setState({isOpenAlert: false})
    this.props.deleteComments(this.props.commentId)
    .then( res => ( res != 500 && this.toaster.show({
        className: "comment-delete-toaster",
        timeout: 1000,
        message: "완료"
      })
    ))
  }

  handleClose() {
    this.setState({isOpenAlert: false})
  }
  render() {
    return (
    <div className="recomment">
    {
    this.props.members
    .filter( e => e.id == this.props.author)
    .map( e => (
    <div key={e.id}>
      <ProfileImage
        imgId={e.profile_image}
        wrapperClass="recomment-profile-wrapper"
        imgClass="recomment-profile" />
      <div className={this.props.isModal ? "modal-recomment-text-block" : "recomment-text-block"}>
        <div className="rock-text">
        <Linkify properties={{target: "_blank"}}>
          {this.props.text}
        </Linkify>
        </div>
        <div className="recomment-title">
          <span className="text-muted"> {e.last_name} </span>
          <span className="text-muted comment-date">
            {moment() - moment(this.props.createDate) < 24 * 60 * 60 * 1000 ? moment(this.props.createDate).locale('ko').fromNow() : moment(this.props.createDate).locale('ko').format('LLL')}
          </span>
        </div>
      </div>
      {this.props.author == this.props.me.id && 
      <span className="recomment-more text-xs-right pt-icon pt-icon-small-cross" onClick={this.deleteEvent.bind(this)}> </span>
      }
      <Alert
        isOpen={this.state.isOpenAlert}
        intent={Intent.DANGER}
        confirmButtonText="삭제"
        cancelButtonText="취소"
        onConfirm={this.handleDeleteClose.bind(this)}
        onCancel={this.handleClose.bind(this)}
      >
        <h6>
          정말 지워요?
        </h6>
      </Alert>
    </div> ))
     }
    </div>
    )
  }
}

ReComment.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  members: state.members,
  me: state.me
})

const mapDispatchToProps = ({
  getMembers,
  deleteComments
})


export default connect(mapStateToProps, mapDispatchToProps)(ReComment)
