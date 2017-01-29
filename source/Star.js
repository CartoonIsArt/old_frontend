import React, {Component} from 'react'
import {connect} from 'react-redux'
import {whoami, postThumbs, deleteThumbs, getThumbsByRock} from './actions'

class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUp: false,
    }
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
    return (
      <div>
        <p className="rock-star card-text text-xs-right text-muted">
          <small> 마음에 들어요{' '} </small>
          <span 
            onClick={this.toggleStar.bind(this)}
            className={this.state.isUp ? "read-rock-star pt-icon pt-icon-star" : "read-rock-star pt-icon pt-icon-star-empty"}>
            {this.props.thumbs && <small className="text-muted"> {this.props.thumbs.filter(e => (
              e.rock && this.props.rockId == e.rock && e.isUp)).length} </small> }
          </span>
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
  me: state.me
})

const mapDispatchToProps = ({
  getThumbsByRock,
  postThumbs,
  whoami,
  deleteThumbs,
})

export default connect(mapStateToProps, mapDispatchToProps)(Star);
