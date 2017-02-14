import React, {Component} from 'react'
import MyNavBar from './MyNavBar'
import {connect} from 'react-redux'
import {whoami} from './actions'

class Doorlock extends Component {
  constructor(props) {
    super(props)
    this.props.whoami()
  }
  render() {
    const doorlock = 39118
    const nonPermissionMessage = "정회원이 되어보세요!"

    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <h4 className="card-title"> 동방 비밀번호 </h4>
              <p> 
                {this.props.me.isRegularMember ? doorlock : nonPermissionMessage
                }
              </p>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

Doorlock.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})
const mapDispatchToProps = ({
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(Doorlock)
