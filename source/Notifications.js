import React, {Component} from 'react'
import MyNavBar from './MyNavBar'
import {Position, PopoverInteractionKind, Popover} from '@blueprintjs/core'
import {connect} from 'react-redux'
import {whoami, getChimebellsByToMemberId} from './actions'
import Notification from './Notification'


class Notifications extends Component {
  constructor(props) {
    super(props)
    this.props.whoami()
    .then( () => {
      this.props.getChimebellsByToMemberId(this.props.me.id)
    })
  }
  render() {
    var unread = this.props.chimebells.filter( e => !e.confirm).length
    return (
    <span>
      <Popover
        content={
          <div className="notifications"> {
          this.props.chimebells.map( chimebell => (
            <Notification
              key={chimebell.id}
              notiId={chimebell.id}
              kind={chimebell.kind}
              text={chimebell.text}
              createDate={chimebell.create_date}
              isConfirm={chimebell.confirm}
              fromId={chimebell.from_member}
              refer={chimebell.refer}
            />
          ))}
          </div>
        }
        className=""
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="pt-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}
        transitionDuration={30}
        enforceFocus={false}
        autoFocus={false}
        useSmartPositioning={true}>
          <button type="button" 
            className="pt-button pt-minimal pt-icon-notifications">
            {
              unread > 0 &&
              <span className="badge badge-pill badge-success">
              {
                unread < 10 ? unread : "9+"
              }
             </span>
            }
          </button>
        </Popover>
    </span>
    )
  }
}
/*
    <span className={this.state.isNotificate && "noti-wrapper"}>
        <button type="button" 
          onClick={() => this.toggleNotificate()}
          className="pt-button pt-minimal pt-icon-notifications noti-button"> 
          {
            unread > 0 &&
            <span className="tag tag-pill tag-success">
            {
              unread < 10 ? unread : "9+"
            }
           </span>
          }
        </button>
        { this.state.isNotificate && 
        <div className="notifications"> {
        this.props.chimebells.map( chimebell => (
          <Notification
            key={chimebell.id}
            notiId={chimebell.id}
            kind={chimebell.kind}
            text={chimebell.text}
            createDate={chimebell.create_date}
            isConfirm={chimebell.confirm}
            fromId={chimebell.from_member}
            refer={chimebell.refer}
          />
        ))
        }
        </div>
        }
    </span>
*/
Notifications.contextTypes = {
  router: React.PropTypes.object
}
const mapStateToProps = state => ({
  chimebells: state.chimebells,
  me: state.me
})
const mapDispatchToProps = ({
  getChimebellsByToMemberId,
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
