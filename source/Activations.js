import React, {Component} from 'react'
import {connect} from 'react-redux'
import {whoami} from './actions'
import MyNavBar from './MyNavBar'

class Activations extends Component {
  constructor(props) {
    super(props)
    this.props.whoami()
  }
  render() {
    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <h4 className="card-title"> 활동인구등록 </h4>
              <h6 className="card-text"> aaaa </h6>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

Activations.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})

const mapDispatchToProps = ({
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(Activations)
