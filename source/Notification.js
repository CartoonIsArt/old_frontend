import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import ProfileImage from './ProfileImage.js'
import {getMembers, patchChimebellsConfirm} from './actions'
import moment from 'moment'


class Notification extends Component {
  constructor(props) {
    super(props)
    this.props.members.filter(e => e.id == this.props.fromId).length === 0 &&
    this.props.getMembers(this.props.fromId)
  }
  handleClick() {
    this.context.router.push(this.props.refer)
    if (!this.props.isConfirm) {
      this.props.patchChimebellsConfirm(this.props.notiId)
    }
  }
  render() {
    return (
      <div className={this.props.isConfirm ? "notification" : "notification-unread"}
        onClick={this.handleClick.bind(this)}
      >
        <span>
        {
          this.props.members
          .filter( e => e.id == this.props.fromId)
          .map( member => (
            <ProfileImage
              key={this.props.notiId}
              wrapperClass="noti-profile-wrapper"
              imgClass="noti-profile"
              imgId={member.profile_image}
            />
          ))
        } 
        </span>
        <span className="noti-text-wrapper">
          <div className="noti-text">
            {this.props.text}
          </div>
          <div className="text-muted">
           <span className={this.props.kind == 0 ? "pt-icon-comment pt-icon noti-date" :
                            this.props.kind == 1 ? "pt-icon-star pt-icon noti-date" : 
                            this.props.kind == 2 ? "pt-icon-feed pt-icon noti-date" : ""}> 
            {moment() - moment(this.props.createDate) < 24 * 60 * 60 * 1000 ? moment(this.props.createDate).locale('ko').fromNow() : moment(this.props.createDate).locale('ko').format('LLL')}
                            </span>
          </div>
        </span>
      </div>
    )
  }
}

Notification.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  members: state.members
})
const mapDispatchToProps = ({
  patchChimebellsConfirm,
  getMembers
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
