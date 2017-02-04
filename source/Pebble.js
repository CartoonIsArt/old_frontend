import React, {Component} from 'react'
import {Link} from 'react-router'
import Comments from './Comments'
import CreateComment from './CreateComment'
import Pebbles from './Pebbles'
import Star from './Star'
import CreatePebble from './CreatePebble'
import {getFiles} from './actions'
import {connect} from 'react-redux'
import {Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import moment from 'moment'
import {youtube_parser} from './Youtube'
import ProfileImage from './ProfileImage'
import Linkify from 'react-linkify'



class Pebble extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCommentView: true
    }
    if (this.props.imgId != null)
    {
      this.props.files.filter(e => e.id == this.props.imgId).length === 0 &&
      this.props.getFiles(this.props.imgId)
    }
    this.myDelete = this.myDelete.bind(this)
  }
  toggleCommentView() {
    this.setState({isCommentView: !this.state.isCommentView})
  }
  myDelete() {
  }
  popoverContent() {
    return (
      <div>
        <ul className="pt-menu">
          <li className="pt-menu-header"> <p> 이 글을  </p> </li>
          <li className="pt-menu-item pt-icon-delete" > 싫어요 </li>
          <li className="pt-menu-item pt-icon-lock"> 블라인드 </li>
          <li className="pt-menu-item pt-icon-trash"> 
            <Link to='/'>
              <p onClick={this.myDelete}> 삭제 </p>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  /*
          <div className="card-block">
            <Popover content={this.popoverContent()}
              className="rock-title-more"
              ineractionKind={PopoverInteractionKind.CLICK}
              popoverClassName="pt-popover-content-sizing"
              position={6}
              transitionDuration={30}
              useSmartPositioning={false}>
              <span className="pt-icon-large pt-icon-more"> </span>  
            </Popover>
  */
  render() {
    return (
    <div>
      <div className="card pebble">
        {
        this.props.imgId ?
        <ProfileImage
          wrapperClass="card-img-top read-rock-image-wrapper"
          imgClass="img-fluid rock-image"
          imgId={this.props.imgId}
        />
        :
        youtube_parser(this.props.text) &&
          <div className="read-rock-youtube-wrapper">
            <iframe
              className="read-rock-youtube"
              src={`https://www.youtube.com/embed/${youtube_parser(this.props.text)}`}
              frameBorder="0"
              allowFullScreen> </iframe>
          </div>
        }
        <div className="card-block">
          <p className="card-text pebble-text"> 
          <Linkify properties={{target: "_blank"}}>
            {this.props.text} 
          </Linkify>
          </p>
          <p className="card-text text-xs-right"> <small className="text-muted"> 
          </small> </p>
        </div>
      </div>
    </div>
    );
  }
}

Pebble.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  files: state.files
})

const mapDispatchToProps = ({
  getFiles
})

export default connect(mapStateToProps, mapDispatchToProps)(Pebble)
