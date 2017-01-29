import {getCommentsByRockId} from './actions'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import Comment from './Comment'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.props.getCommentsByRockId(props.rockId)
  }

  render() {
    return (
    <div>
      {
        this.props.comments
        .filter(e => (
          e.parent_comment == null &&
          this.props.rockId == e.rock))
        .map(comment => (
          <Comment 
            isModal={this.props.isModal}
            key={comment.id}
            commentId={comment.id}
            author={comment.author}
            text={comment.text}
            time={comment.write_date}
            rockId={this.props.rockId}
          />))
      }
    </div>
    )
  }
}

Comments.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  comments: state.comments,
})

const mapDispatchToProps = ({
  getCommentsByRockId,
})


export default connect(mapStateToProps, mapDispatchToProps)(Comments)
