import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBadges} from './actions'


class Badge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      badge: {}
    }
    this.props.getBadges(this.props.badgeId)
    .then(badge => this.setState({badge}))
    this.colorMap = {
      1: "badge-primary",
      2: "badge-niagara"
    }
  }
  render(){
    const colorClass = "badge " + this.colorMap[this.state.badge.color]
    const description = this.state.badge.description
    return (
      <span className={colorClass}>
        {description}
      </span>
    )
  }
}

Badge.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  badges: state.badges
})

const mapDispatchToProps = ({
  getBadges
})

export default connect(mapStateToProps, mapDispatchToProps)(Badge)
