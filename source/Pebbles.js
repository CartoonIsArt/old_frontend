import React, {Component} from 'react'
import Pebble from './Pebble'
import {getRocksByParent} from './actions'
import {connect} from 'react-redux'

class Pebbles extends Component {
  constructor(props) {
    super(props)
    props.getRocksByParent(props.rockId)
  }
  render() {
    return (
      <div>
      {
        this.props.rocks
        .filter(e => (e.parent_rock == null ? false : this.props.rockId == e.parent_rock))
        .map(pebble => (
          <Pebble
            key = {`"pebble_"${pebble.id}`}
            text={pebble.text}
            imgId={pebble.attached_image}
            time={pebble.write_date}
            pebbleId = {pebble.id} />))
      }
      </div>
    )
  }
}

Pebbles.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  rocks: state.rocks
})

const mapDispatchToProps = ({
  getRocksByParent
})

export default connect(mapStateToProps, mapDispatchToProps)(Pebbles) 
