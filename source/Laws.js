import React, {Component} from 'react'
import MyNavBar from './MyNavBar'
import {connect} from 'react-redux'
import {getMeta} from './actions'

class Laws extends Component {
  constructor(props) {
    super(props)
    this.props.getMeta()
  }
  render() {
    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <h4 className="card-title"> 회칙 </h4>
              <p className="rock-text">
              {
                this.props.meta
                .filter(e => e.name === 'law')
                .map(e => e.value)
              }
              </p>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

Laws.contextTypes = {
  router: React.PropTypes.object
}
const mapStateToProps = state => ({
  meta: state.meta
})
const mapDispatchToProps = ({
  getMeta
})

export default connect(mapStateToProps, mapDispatchToProps)(Laws)
