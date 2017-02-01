import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect } from 'react-redux'
import {postRossetaStone, postThumbs, getFiles, getRocks, deleteRocks, whoami, getMembers} from './actions'
import Comments from './Comments'
import CreateComment from './CreateComment'
import Pebbles from './Pebbles'
import CreatePebble from './CreatePebble'
import {Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import MyNavBar from './MyNavBar'
import Star from './Star'
import moment from 'moment'
import {youtube_parser} from './Youtube'
import Linkify from 'react-linkify'


class ReadRock extends Component{
  constructor(props) {
    super(props)
    this.state = {
      "authorName": "",
      "authorId": "",
      "isCommentView": true,
      "isCreatePebble": false,
    }
    this.myDelete = this.myDelete.bind(this)
    this.props.whoami()
    .then( () => {
      this.setState({
        member: this.props.me.id,
        rock: this.props.params.id,
        isUp: false
      })
    })
    this.props.getRocks(this.props.params.id)
    .then( json => {
      json.attached_image && 
      this.props.files.filter(e => e.id == json.attached_image).length === 0 &&
      this.props.getFiles(json.attached_image)
      this.props.getMembers(json.author)
      .then(json => {
        this.setState({
          authorName: json.last_name,
          authorId: json.id
        })
      })
    })
    this.props.postRossetaStone({rock: this.props.params.id})
  }
  toggleIsCreatePebble () {
    this.setState({isCreatePebble: !this.state.isCreatePebble})
  }

  toggleCommentView() {
    this.setState({isCommentView: !this.state.isCommentView})
  }
  
  myDelete() {
    this.props.deleteRocks(this.props.params.id)
    .then( () => {
      this.context.router.push('/')
    })
    
  }

  hate() {
    this.props.postThumbs(this.state)
  }

  render() {
    const popCon = (
      <div>
        <ul className="pt-menu">
          <li className="pt-menu-header"> <p> 이 글을  </p> </li>
          <li className="pt-menu-item pt-icon-delete" > 
            <p onClick={this.hate.bind(this)}> 싫어요 </p>
          </li>
          <li className="pt-menu-item pt-icon-trash"> 
            <p onClick={this.props.isModal ? this.props.onDelete : this.myDelete}> 삭제 </p>
          </li>
        </ul>
      </div>
    )
    const popConNotAuthor = (
      <div>
        <ul className="pt-menu">
          <li className="pt-menu-header"> <p> 이 글을  </p> </li>
          <li className="pt-menu-item pt-icon-delete" > 싫어요 </li>
        </ul>
      </div>
    )
    return (
      <div className={this.props.className}
        onClick={this.props.onClick}>
        {!this.props.isModal && <MyNavBar />}
        <div className={!this.props.isModal && "container"}>
        {
        this.props.rocks
        .filter(e => (e.id == this.props.params.id))
        .map(rock=>(
        <div key={`"read_"${rock.id}`} >
          <div className="read-rock card" style={this.props.isModal ? {display: "block"} : {marginTop: "56px"}}>
            <div className="card-block">
              <h4 className="card-title"> {rock.title}
              {
                <Popover 
                  content={this.props.me.id == rock.author ? popCon : popConNotAuthor}
                  className="rock-title-more"
                  ineractionKind={PopoverInteractionKind.CLICK}
                  popoverClassName="pt-popover-content-sizing"
                  position={6}
                  transitionDuration={30}
                  enforceFocus={false}
                  autoFocus={false}
                  useSmartPositioning={false}>
                  <span className="pt-icon-large pt-icon-more"> </span>  
                </Popover>
              }
              </h4>
              <h6 className="rock-subtitle card-subtitle text-muted"> {this.state.authorName} </h6>
            </div>
            {
              rock.attached_image ?
              this.props.files
              .filter(e => (
                e.id == rock.attached_image))
              .map(e => (
            <div 
              key={e.id}
              className="card-img-top read-rock-image-wrapper">
                <img 
                  className="img-fluid rock-image"
                  src={`http://cia.kw.ac.kr:3001/media/${e.file_hash}`}
                  alt={e.filename}
                />
            </div>))
              :
              youtube_parser(rock.text) &&
              <div 
              className="read-rock-youtube-wrapper">
              <iframe
                className="read-rock-youtube"
                src={`https://www.youtube.com/embed/${youtube_parser(rock.text)}`}
                frameBorder="0" 
                allowFullScreen></iframe>
              </div>
            }

         <div className="card-block">
           <p className="card-text rock-text"> 
           <Linkify properties={{target: "_blank"}}>
            {rock.text} 
           </Linkify>
           </p>
         </div>
         </div>
          <Pebbles rockId={rock.id} />
          <div className="card pebble">
            <div className="card-block">
              <Star rockId={rock.id} />
              <p className="card-text text-xs-right"> <small className="text-muted"> 
                {moment() - moment(rock.write_date) < 24 * 60 * 60 * 1000 ? moment(rock.write_date).locale('ko').fromNow() : moment(rock.write_date).locale('ko').format('LLL')}
              </small> </p>
             {
             this.props.me.id == this.state.authorId &&
             <p className="text-xs-right card-text text-muted write-pebble-button"
                onClick={() => this.toggleIsCreatePebble()}
              > <small> 이어쓰기 </small> </p>
              }
            </div>
          </div>
         { 
             this.state.isCreatePebble &&
             this.state.authorId == this.props.me.id &&
             <CreatePebble rockId={rock.id} />
          }
          { this.state.isCommentView && <Comments key={rock.id} rockId={rock.id} isModal={this.props.isModal}/> }
          { this.state.isCommentView && <CreateComment rockId={rock.id} rockAuthor={this.state.authorId} isModal={this.props.isModal}/> }
          
         </div>))
        }
        </div>
      </div>
    )
  }
}



ReadRock.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  rocks: state.rocks,
  files: state.files,
  me: state.me
})

const mapDispatchToProps = ({
  getFiles,
  getRocks,
  postThumbs,
  whoami,
  getMembers,
  postRossetaStone,
  deleteRocks
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadRock)
