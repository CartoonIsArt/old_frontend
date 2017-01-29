import React, {Component} from 'react'
import {Toaster, IToaster, Intent, Alert, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import {connect} from 'react-redux'
import {getMembers, deleteComments} from './actions'
import ProfileImage from './ProfileImage'
import CreateReComment from './CreateReComment'
import ReComments from './ReComments'
import moment from 'moment'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecommentOn: false,
      isCreateRecommentOn: false,
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
        className: "toaster-success",
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
    <div>
      {
      this.props.members
      .filter(e => e.id == this.props.author)
      .map( e => (
      <div key={`"com_"${this.props.commentId}${e.id}`} className="list-group-item">
        <ProfileImage
          imgId={e.profile_image}
          wrapperClass="comment-profile-wrapper"
          imgClass="comment-profile"  />
        <div className={this.props.isModal ? "card-outline-secondary modal-comment-text-block" : "card-outline-secondary comment-text-block"}>
          <p className="rock-text">
            {this.props.text}
          </p>
            <div className="comment-title">
            <span className="comment-author text-muted"> {e.last_name} </span>
            <span className="comment-date text-muted"> 
            {moment() - moment(this.props.time) < 24 * 60 * 60 * 1000 ? moment(this.props.time).locale('ko').fromNow() : moment(this.props.time).locale('ko').format('LLL')}
            </span>
          </div>
          <div className="comment-title">
          <a href="#" onClick={this.toggleCreateReComment.bind(this)}>
            <span className="comment-add-recomment text-muted"> 답글 </span>
          </a>
          </div>
        </div>
        { this.props.author == this.props.me.id &&
        <span className="comment-more text-xs-right pt-icon pt-icon-small-cross" onClick={this.deleteEvent.bind(this)}> </span>
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
        <ReComments commentId={this.props.commentId} 
          isModal={this.props.isModal}
        />
        {this.state.isCreateRecommentOn && 
        <CreateReComment 
          rockId={this.props.rockId} 
          commentId={this.props.commentId}
          isModal={this.props.isModal}
        /> }
      </div>))
      }
    </div>
    )
  }
}

Comment.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me,
  members: state.members
})

const mapDispatchToProps = ({
  getMembers,
  deleteComments
})


export default connect(mapStateToProps, mapDispatchToProps)(Comment)
