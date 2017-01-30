import React, {Component} from 'react'
import MyNavBar from './MyNavBar'
import ManageRow from './ManageRow'
import {connect} from 'react-redux'
import {getAllMembers} from './actions'
import {Tooltip, Position} from '@blueprintjs/core'
import {sort} from 'timsort'
import sortBy from 'sort-by'

class ManagePane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameAtoZ: true,
      activeFirst: true,
      contributerFirst: true,
      anonFirst: false,
      users: []
    }
    this.props.getAllMembers()
    .then( () => {
      this.setState({users: this.props.members})
    })
  }
  sortByName() {
  }
  sortByActive() {
  }
  sortByContributer() {
  }
  sortByAnon() {
  }
  sortByGraduate() {
  }
  render() {
    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <table className="table">
              <thead>
                <tr>
                  <th onClick={this.sortByName.bind(this)}>
                  이름
                  <span className="pt-icon pt-icon-double-caret-vertical"> </span>
                  </th>
                  <th onClick={this.sortByActive.bind(this)}>
                  활동인구
                  <span className="pt-icon pt-icon-double-caret-vertical"> </span>
                  </th>
                  <th onClick={this.sortByContributer.bind(this)}>
                    <Tooltip
                      content="정기적으로 CIA를 후원해주시는 선배님입니다. 사랑해요!"
                      position={Position.BOTTOM}>
                      <span>
                        후원자
                      <span className="pt-icon pt-icon-double-caret-vertical"> </span>
                      </span>
                    </Tooltip>
                  </th>
                  <th onClick={this.sortByAnon.bind(this)}>
                  가입 승인
                  <span className="pt-icon pt-icon-double-caret-vertical"> </span>
                  </th>
                  <th onClick={this.sortByGraduate.bind(this)}>
                  졸업
                  <span className="pt-icon pt-icon-double-caret-vertical"> </span>
                  </th>
                </tr>
              </thead>
                <tbody>
                {this.props.members
                .map(member => (
                  <ManageRow
                    key={member.id}
                    memberId={member.id}
                    name={member.last_name}
                    isActive={member.isActive}
                    isContributer={member.isContributer}
                    isAnon={member.isAnon}
                    isGraduate={member.isGraduate}
                  />
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ManagePane.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  members: state.members
})

const mapDispatchToProps = ({
  getAllMembers
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagePane)
