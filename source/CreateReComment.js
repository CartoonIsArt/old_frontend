import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProfileImage from './ProfileImage'
import {whoami, postComments} from './actions'

class CreateReComment  extends Component {
  constructor(props){
    super(props)
    this.state = {
      rock: this.props.rockId,
      author: this.props.me.id,
      parent_comment: this.props.commentId,
    }
    this.props.whoami()
    .then( () => {
      this.setState({author: this.props.me.id})
    })
  }


  textChange(event){
    this.setState({text: event.target.value})
  }
  recommentSubmit(e) {
    this.props.postComments(this.state)
    this.refs.inputField.value = ""
  }
  handleKeyDown(event){
    if(event.ctrlKey && event.keyCode == 13) {
      this.recommentSubmit()
    }
  }


  render(){
    return (
      <div className="recomment">
        <ProfileImage
          imgId={this.props.me.profile_image}
          wrapperClass="recomment-profile-wrapper"
          imgClass="recomment-profile" />
        <div className={this.props.isModal ? "modal-recomment-text-block" : "recomment-text-block"}>
          <textarea ref="inputField" 
            className="form-control" 
            onChange={this.textChange.bind(this)} 
            onKeyDown={this.handleKeyDown.bind(this)}/>
          <span onClick={this.recommentSubmit.bind(this)} className="comment-submit"> 답글 </span>
        </div>
      </div>
    )
  }
}

CreateReComment.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})

const mapDispatchToProps = ({
  postComments,
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateReComment)
