import React, {Component} from 'react'
import {Switch, Toaster, Intent} from '@blueprintjs/core'
import {getMembers, patchMembers} from './actions'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class ManageRow extends Component {
  constructor(props) {
    super(props)
  }

  toggleActive (event) {
    this.props.patchMembers({
      isActive: !this.props.isActive,
      isContributer: this.props.isContributer,
      isAnon: this.props.isAnon,
      id: this.props.memberId
    })
    .then( res => {
      if (res === 200) {
        this.toaster.show({
          className: "manage-toggle-toaster-success",
          timeout: 1500,
          message: "변경됨"
        })
      }
      else {
        this.toaster.show({
          className: "manage-toggle-toaster-fail",
          timeout: 1500,
          message: "실패"
        })
        this.props.getMembers(this.props.memberId)
      }
    })
  }
  toggleContributer (event) {
    this.props.patchMembers({
      isActive: this.props.isActive,
      isContributer: !this.props.isContributer,
      isAnon: this.props.isAnon,
      id: this.props.memberId
    })
    .then( res => {
      if (res === 200) {
        this.toaster.show({
          className: "manage-toggle-toaster-success",
          timeout: 1500,
          message: "변경됨"
        })
      }
      else {
        this.toaster.show({
          className: "manage-toggle-toaster-fail",
          timeout: 1500,
          message: "실패"
        })
        this.props.getMembers(this.props.memberId)
      }
    })
  }
  toggleAnon (event) {
    this.props.patchMembers({
      isActive: this.props.isActive,
      isContributer: this.props.isContributer,
      isAnon: !this.props.isAnon,
      id: this.props.memberId
    })
    .then( res => {
      if (res === 200) {
        this.toaster.show({
          className: "manage-toggle-toaster-success",
          timeout: 1500,
          message: "변경됨"
        })
      }
      else {
        this.toaster.show({
          className: "manage-toggle-toaster-fail",
          timeout: 1500,
          message: "실패"
        })
        this.props.getMembers(this.props.memberId)
      }
    })
  }
  componentWillMount() {
    this.toaster = Toaster.create()
  }
  
  render() {
    return (
      <tr>
        <td> {this.props.name} </td>
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
