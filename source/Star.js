import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Intent, NonIdealState, Tooltip, Position} from '@blueprintjs/core'
import {getAllMembers, whoami, postThumbs, deleteThumbs, getThumbsByRock} from './actions'

class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUp: false,
    }
    this.props.getAllMembers()
    this.props.getThumbsByRock(this.props.rockId)
    .then( () => {
      this.props.whoami()
      .then( () => {
        this.props.thumbs.forEach(thumb => {
          if (thumb.member == this.props.me.id 
            && thumb.rock == this.props.rockId) {
            this.setState({
              isUp: thumb.isUp,
              thumbId: thumb.id
            })
          }
        })
      })
    })
    Star.mutex = false
  }
  toggleStar(e) {
    e.preventDefault()
    if(Star.mutex) {
      return
    }
    Star.mutex = true
    if (!this.state.isUp) {
      this.props.postThumbs({
        member: this.props.me.id,
        rock: this.props.rockId,
        isUp: true
      }).then(res => {
         this.setState({
          thumbId: res,
          isUp: true
        })
        Star.mutex = false
      })
    }
    else {
      this.props.deleteThumbs({
        member: this.props.me.id,
        rock: this.props.rockId,
        id: this.state.thumbId
      }).then( () => {
        Star.mutex = false
      })
      this.setState({isUp: false})
    }
  }

  render() {
    const thumb = this.props.thumbs ? this.props.thumbs.filter(e => (e.rock && this.props.rockId == e.rock && e.isUp)) : false
    const members = thumb && this.props.members.reduce((res, val) => (
      thumb.map(e => e.member).includes(val.id) ? res.concat(val.last_name) : res), [])
      .reduce((res, val) => res + val + "\n", "")
    return (
      <div>
        <p className="rock-star card-text text-xs-right text-muted">
          <small> 마음에 들어요{' '} </small>
          <Tooltip
            intent={Intent.NONE}
            content={members.length !== 0 ? 
              <span className="who-stared"> {members} </span> :
              <NonIdealState
                className="text-muted"
                visual="star"
                title="지금 누르면 1등"
              />
            }
            hoverOpenDelay={1}
            hoverCloseDelay={1}
            transitionDuration={1}
            position={Position.RIGHT}>
            <span 
              onClick={this.toggleStar.bind(this)}
              className={this.state.isUp ? "read-rock-star pt-icon pt-icon-star" : "read-rock-star pt-icon pt-icon-star-empty"}>
              {thumb && <small className="text-muted"> {thumb.length} </small>}
            </span>
          </Tooltip>
        </p>
      </div>
    )
  }
}

Star.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  thumbs: state.thumbs,
  members: state.members,
  me: state.me
})

const mapDispatchToProps = ({
  getThumbsByRock,
  postThumbs,
  whoami,
  getAllMembers,
  deleteThumbs,
})

export default connect(mapStateToProps, mapDispatchToProps)(Star);
