import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFiles} from './actions'

class ProfileImage extends Component {
  constructor(props) {
    super(props)
    this.props.files.filter(e => e.id == this.props.imgId).length === 0 &&
    this.props.getFiles(this.props.imgId)
  }
  render() {
    return (
      <div className={this.props.wrapperClass}>
      {
      this.props.files
      .filter(e => e.id == this.props.imgId)
       .map( e=> (
        <div key={e.id}>
          <img 
            className={this.props.imgClass}
            src={`http://cia.kw.ac.kr:3001/media/${e.file_hash}`}
            alt={e.filename} />
        </div>))
      }
      </div>
    )
  }
}

ProfileImage.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  files: state.files
})

const mapDispatchToProps = ({
  getFiles
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)
