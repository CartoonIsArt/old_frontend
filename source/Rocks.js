import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Rock from './Rock';
import AddRock from './AddRock';
import MyNavBar from './MyNavBar'
import ReadRock from './ReadRock'
import 'whatwg-fetch';
import 'babel-polyfill';
import {connect } from 'react-redux'
import {deleteRocks, getIndexPageRocks, getRocksByURL, whoami} from './actions'
import Masonry from 'react-masonry-component'
import {Hotkey, Hotkeys, HotkeysTarget} from '@blueprintjs/core'

@HotkeysTarget
class Rocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOn: false,
      isDisplayImage: true,
    }
    this.props.getIndexPageRocks()
    .then(res => {
      if (res === 500) {
        this.context.router.push('/brand')
      }
      else {
        this.props.whoami()
      }
    })
    this.more = this.more.bind(this)
    Rocks.mutex = true
  }
  getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
        )
  }
  more(e)  {
    if (this.props.cursor.next == undefined || this.props.cursor.next == null){
      return;
    }
    e.preventDefault()
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = this.getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if (pctScrolled > 60 && Rocks.mutex)
    {
      Rocks.mutex = false
      this.props.getRocksByURL(this.props.cursor.next)
      .then( () => Rocks.mutex = true)
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.more)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.more)
  }

  rockClick(modalRockId) {
    if(window.innerWidth < 800) {
      this.context.router.push('/rocks/' + modalRockId)
    }
    else {
      this.setState({modalRockId})
      this.setState({isModalOn: true})
      document.body.style.overflow='hidden'
      history.pushState('', '', '/rocks/' + modalRockId)
    }
  }
  closeModal() {
    this.setState({isModalOn: false})
    document.body.style.overflow='auto'
    this.props.getIndexPageRocks()
    this.context.router.push('/')
  }

  handleDeleteRock() {
    this.props.deleteRocks(this.state.modalRockId)
    .then(() => this.closeModal())
  }

  render() {
    return (
      <div>
        <MyNavBar />
        <div className="main-rocks container">
        {this.state.isModalOn &&
        <div className="rock-modal" onClick={this.closeModal.bind(this)}>
          <ReadRock
            onClick={ e => e.stopPropagation()}
            params={{id:this.state.modalRockId}}
            className="rock-modal-content modal-readrock"
            isModal={true}
            onDelete={this.handleDeleteRock.bind(this)}
            />
        </div>}
          <Masonry>
          {
          this.props.rocks
          .filter( e => (e.parent_rock == null))
          .map(
            (rock, idx) => ( 
            <div onClick={() => this.rockClick(rock.id)}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12 rock-padding"
            key={idx}>
            <Rock 
            isDisplayImage={this.state.isDisplayImage}
            author={rock.author}
            isRead={true}
            title={rock.title}
            rockId={rock.id}
            imgId={rock.attached_image}
            onLoad={() => this.forceUpdate()}
            text={rock.text}
            touchedDate={rock.touch_date}
            createdDate={rock.write_date} />
            </div>
            ))
          }
          </Masonry>
        </div>
	    <AddRock />
      </div>
    )
  } 
  renderHotkeys() {
    return <Hotkeys>
      <Hotkey
        global={true}
        combo="esc"
        label="Get modal off"
        onKeyDown={ () => this.state.isModalOn && this.closeModal()}
      />
    </Hotkeys>
  }
}
Rocks.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  rocks: state.rocks,
  cursor: state.cursor,
  rossetastone: state.rossetastone,
  me: state.me
})
const mapDispatchToProps = ({
  getIndexPageRocks,
  getRocksByURL,
  deleteRocks,
  whoami,
})
export default connect(mapStateToProps, mapDispatchToProps)(Rocks)
