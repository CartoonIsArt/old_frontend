import {connect } from 'react-redux'
import {postRossetaStone, whoami, postComments} from './actions'
import React, {Component} from 'react';
import {Link} from 'react-router';
import FileDrop from 'react-file-drop';
import ProfileImage from './ProfileImage'

class CreateComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rock: this.props.rockId,
      rockAuthor: this.props.rockAuthor,
      author: this.props.me.id,
    }
    this.textChange = this.textChange.bind(this)
    this.commentSubmit = this.commentSubmit.bind(this)
    this.props.whoami()
    .then( () => {
      this.setState({author: this.props.me.id})
    })
  }

  commentSubmit(e) {
    this.props.postComments(this.state)
    this.refs.inputField.value = ""
    this.props.postRossetaStone({rock: this.state.rock})
    e && e.preventDefault()
  }
  textChange(event) {
    this.setState({text: event.target.value})
  }
  handleKeyDown(event) {
    if(event.ctrlKey && event.keyCode == 13) {
      this.commentSubmit()
    }
  }
  render() {
    return (
      <div className="comments">
        <div className="list-group-item">
          <ProfileImage 
            imgId={this.props.me.profile_image}
            wrapperClass="comment-profile-wrapper"
            imgClass="comment-profile"/>
          <div className={this.props.isModal ? "card-outline-secondary modal-comment-text-block" : "card-outline-secondary comment-text-block"}>
          <form>
            <div className="rock-text">
              <textarea ref="inputField" 
                className="form-control" 
                onChange={this.textChange}
                onKeyDown={this.handleKeyDown.bind(this)}/>
            </div>
            <button type="submit" onClick={this.commentSubmit} className="comment-submit"> 댓글 </button>
          </form>
          </div>
        </div>
      </div>
    )
  }
  
}

CreateComment.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})

const mapDispatchToProps = ({
  postRossetaStone,
  postComments,
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)
