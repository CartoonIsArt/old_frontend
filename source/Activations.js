import React, {Component} from 'react'
import {connect} from 'react-redux'
import {patchMembers, whoami} from './actions'
import MyNavBar from './MyNavBar'
import {NonIdealState, Switch} from '@blueprintjs/core'
import Linkify from 'react-linkify'

class Activations extends Component {
  constructor(props) {
    super(props)
    this.props.whoami()
  }
  toggleActive(event) {
    this.props.patchMembers({
      isActive: !this.props.me.isActive,
      id: this.props.me.id
    })
    .then( () => this.props.whoami())
  }
  render() {
    const description = <span> 당신은 이번학기 활동인구입니다 </span>
    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <div className="pt-non-ideal-state">
                <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon transition-3s">
                  <span 
                    style={{transition: "inherit"}}
                    className={this.props.me.isActive ? 
                      "pt-icon pt-icon-pulse main-color" :
                      "pt-icon pt-icon-pulse"}> 
                  </span>
                </div>
                
                <Linkify>
                <h4> 활동인구 등록 </h4>
                </Linkify>
                {this.props.me.isActive &&
                <div className="pt-non-ideal-state-description">
                  {description}
                </div>
                }
                <div className="pt-non-ideal-state-action">
                  <Switch
                    checked={this.props.me.isActive}
                    onChange={e => this.toggleActive(e)}
                  />
                </div>
              </div>
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
  patchMembers,
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(Activations)
