import {getCommentsByParentComment} from './actions'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import ReComment from './ReComment'

class ReComments extends Component {
  constructor(props) {
    super(props)
    this.props.getCommentsByParentComment(props.commentId)
  }

  render() {
    return (
    <div>
    {
      this.props.comments
      .filter( e => (
        e.parent_comment !== null &&
        e.parent_comment !== undefined &&
        this.props.commentId == e.parent_comment
        ))
      .map(e => (
        <ReComment 
          key={e.id}
          commentId={e.id}
          text={e.text}
          author={e.author}
          createDate={e.write_date}
          isModal={this.props.isModal}
        />
      ))
    }
    </div>
    )
  }
}

ReComments.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  comments: state.comments,
})

const mapDispatchToProps = ({
  getCommentsByParentComment,
})


export default connect(mapStateToProps, mapDispatchToProps)(ReComments)
