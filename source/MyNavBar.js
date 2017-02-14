import React, { Component} from 'react';
import {Link} from 'react-router';
import {ProgressBar, Menu, MenuItem, MenuDivider, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import {connect } from 'react-redux'
import {getIndexPageRocks, getChimebellsByToMemberId, whoami, logout, getRocksBySearch} from './actions'
import Notifications from './Notifications'
import {host} from './Configure'

class MyNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchClicked: false,
      progress: -1,
    }
    this.logout = this.logout.bind(this)
    this.props.whoami()
  }
  logout() {
    this.props.logout()
    .then( () => {
      this.context.router.push('/brand')
    })
  }
  polling() {
  /*
    this.setState({progress: 0.25})
    this.props.getIndexPageRocks()
    .then(() => this.setState({progress: 0.75}))
    this.props.getChimebellsByToMemberId(this.props.me.id)
    .then(() => this.setState({progress: 1}))
    setTimeout(() => this.setState({progress: -1}), 1000)
  */
  }
  searchEvent(event) {
    if(event.keyCode === 13) {
      this.props.getRocksBySearch(event.target.value)
    }
  }
  toggleMeta() {
    if (this.context.router.location.pathname == '/meta') {
      this.context.router.push('/')
    }
    else {
      this.context.router.push('/meta')
    }
  }
  render() {
    var progressClass = "pt-no-stripes custom-progress pt-intent-cia "
    if(this.state.progress < 0) {
      progressClass =  progressClass + "display-none "
    }
    return (
      <nav className="pt-navbar .modifier pt-fixed-top">
        <ProgressBar className={progressClass}
          value={this.state.progress}
        />
        {this.state.isSearchClicked ? 
        <div className="container">
        <div className="pt-navbar-group pt-align-right">
          <div className="pt-input-group my-nav-input">
          <span className="pt-icon pt-icon-search"> </span>
          <input className="pt-input" placeholder="검색" type="text" onKeyDown={this.searchEvent.bind(this)} />
          </div>
          <button type="button" 
            className="pt-button pt-minimal pt-icon-undo" 
            onClick={() => this.setState({isSearchClicked: !this.state.isSearchClicked})}> 
            </button>  
        </div>
        </div>
        :
        <div className="container">
          <span className="nav-logo" onClick={() => this.polling()}>
            <Link to='/'>
              <img src={`${host}/static/logo80.png`} style={{width: '80px'}}
                className={!this.props.me.isActive && "image-muted"}
              />
            </Link>
          </span>
        <div className="pt-navbar-group pt-align-right">
          <Notifications />
          <button type="button"
            className="pt-button pt-minimal pt-icon-search"
            onClick={() => this.setState({isSearchClicked: !this.state.isSearchClicked})}>
          </button>
        </div>
        <div className="pt-navbar-group pt-align-left">
          <button onClick={this.toggleMeta.bind(this)} type="button" className="pt-button pt-minimal pt-icon-cog"> </button>
        </div>
        </div>
        }
      </nav>
    );
  }
}


MyNavBar.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  me: state.me
})

const mapDispatchToProps = ({
  getIndexPageRocks,
  getChimebellsByToMemberId,
  whoami,
  logout,
  getRocksBySearch
})

export default connect(mapStateToProps, mapDispatchToProps)(MyNavBar)
