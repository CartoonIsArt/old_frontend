import React, {Component} from 'react'
import {Switch, Toaster, Intent} from '@blueprintjs/core'
import {getMembers, patchMembers} from './actions'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import moment from 'moment'


class ManageRow extends Component {
  constructor(props) {
    super(props)
    this.toggleSuccess = {
      className: "toaster-success",
      timeout: 1500,
      message: "변경됨"
    }
    this.toggleFail = {
      className: "toaster-fail",
      timeout: 1500,
      message: "실패"
    }
  }
  fetchToggle(data) {
    this.props.patchMembers(data)
    .then( res => {
      if (res === 200) {
        this.toaster.show(this.toggleSuccess)
      }
      else {
        this.toaster.show(this.toggleFail)
        this.props.getMembers(this.props.memberId)
      }
    })
  }

  toggleActive (event) {
    this.fetchToggle({
      isActive: !this.props.isActive,
      id: this.props.memberId
    })
  }
  toggleContributer (event) {
    this.fetchToggle({
      isContributer: !this.props.isContributer,
      id: this.props.memberId
    })
  }
  toggleAnon (event) {
    this.fetchToggle({
      isAnon: !this.props.isAnon,
      id: this.props.memberId
    })
  }
  toggleGraduate (event) {
    this.fetchToggle({
      isGraduate: !this.props.isGraduate,
      id: this.props.memberId
    })
  }
  componentWillMount() {
    this.toaster = Toaster.create()
  }
  
  render() {
    return (
      <tr>
        <td> 
          <div>
            {this.props.name} 
          </div>
          <div className="text-muted">
          <small>
            {moment(this.props.birthday).format('YYYY-MM-DD')} 
          </small>
          </div>
        </td>
        <td>
          <Switch 
            checked={this.props.isActive}
            onChange={this.toggleActive.bind(this)}
          />
        </td>
        <td>
          <Switch 
            checked={this.props.isContributer}
            onChange={this.toggleContributer.bind(this)}
          />
        </td>
        <td>
          <Switch 
            checked={!this.props.isAnon}
            onChange={this.toggleAnon.bind(this)}
          />
        </td>
        <td>
          <Switch 
            checked={this.props.isGraduate}
            onChange={this.toggleGraduate.bind(this)}
          />
        </td>
      </tr>
    )
  }
}

ManageRow.contextTypes = {
  router: React.PropTypes.object
}
const mapStateToProps = state => ({
  
})
const mapDispatchToProps = ({
  patchMembers,
  getMembers
})


export default connect(mapStateToProps, mapDispatchToProps)(ManageRow)
