import React, {Component} from 'react'
import MyNavBar from './MyNavBar'
import Masonry from 'react-masonry-component'
import {whoami} from './actions' 
import {connect} from 'react-redux'
import {logout} from './actions'
import {Link} from 'react-router'

class MetaCIA extends Component {
  logout() {
    this.props.logout()
    .then( () => {
      this.context.router.push('/brand')
    })
  }
  render() {
    const logoutRock = (
    <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
      <div className="card main-rock rock-read" onClick={this.logout.bind(this)}>
        <div className="card-block">
          <h4 className="card-title rocks-title"> 로그아웃 </h4>
        </div>
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
            <span className="pt-icon pt-icon-log-out"> </span> 
            {' '}잘가요
          </h6>
        </div>
      </div>
    </div>
    )
    const lawRock = (
    <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
    <Link to='/laws'>
      <div className="card main-rock rock-read">
        <div className="card-block">
          <h4 className="card-title rocks-title"> 회칙 </h4>
        </div>
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
            <span className="pt-icon pt-icon-book"> </span> 
            {' '} v.13
          </h6>
        </div>
      </div>
    </Link>
    </div>
    )
    const myAccountRock = (
    <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
    <Link to="/profile">
      <div className="card main-rock rock-read">
        <div className="card-block">
          <h4 className="card-title rocks-title"> 내정보 </h4>
        </div>
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
            <span className="pt-icon pt-icon-person"> </span> 
            {' '} 바꾸기
          </h6>
        </div>
      </div>
    </Link>
    </div>
    )
    const donateRock = (
    <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
    <Link to='/donations'>
      <div className="card main-rock rock-read text-center">
        <div className="card-block">
          <h4 className="card-title rocks-title"> 선배님  </h4>
          <h4 className="card-title rocks-title">  CIA를 </h4>
          <h4 className="card-title rocks-title">  도와주세요 </h4>
        </div>
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
            <span className="pt-icon pt-icon-heart"> </span> 
            {' '} CIA에 따듯한 손길을
          </h6>
        </div>
      </div>
    </Link>
    </div>
    )
    const activateRock = (
    <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
    <Link to='/activations'>
      <div className="card main-rock rock-read text-center">
        <div className="card-block">
          <h4 className="card-title rocks-title"> 활동인구는  </h4>
          <h4 className="card-title rocks-title">  언제나 </h4>
          <h4 className="card-title rocks-title">  환영이야! </h4>
        </div>
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
            <span className="pt-icon pt-icon-hand"> </span> 
            {' '} 2017년 1학기 활동인구등록
          </h6>
        </div>
      </div>
    </Link>
    </div>
    )
    const bugbountRock = (
      <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
      <Link to='/bugbount'>
        <div className="card main-rock rock-read text-center">
          <div className="card-block">
            <h4 className="card-title rocks-title"> 모던 동게  </h4>
          </div>
          <div className="card-row"> </div>
          <div className="card-block">
            <h6 className="card-text rocks-text"> 
              <span className="pt-icon pt-icon-highlight"> </span> 
              {' '} 베타 테스트
            </h6>
          </div>
        </div>
      </Link>
      </div>
    )
    const manageRock = (
      <div className="col-lg-3 rock-padding col-md-4 col-sm-6 col-xs-12">
      <Link to='/users'>
        <div className="card main-rock rock-read text-center">
          <div className="card-block">
            <h4 className="card-title rocks-title"> 회원 리스트  </h4>
          </div>
          <div className="card-row"> </div>
          <div className="card-block">
            <h6 className="card-text rocks-text"> 
              <span className="pt-icon pt-icon-tick"> </span> 
              {' '} 계정 관리
            </h6>
          </div>
        </div>
      </Link>
      </div>
    )
    return (
      <div>
        <MyNavBar />
        <div className="container main-rocks">
          <Masonry>
            {this.props.me.isGraduate ? donateRock : activateRock}
            {this.props.me.is_staff && manageRock}
            {bugbountRock}
            {lawRock}
            {myAccountRock}
            {logoutRock}
          </Masonry>
        </div>
      </div>
    )
  }
}
MetaCIA.contextTypes = {
  router: React.PropTypes.object
}
const mapStateToProps = state => ({
  me: state.me
})
const mapDispatchToProps = ({
  logout,
  whoami
})

export default connect(mapStateToProps, mapDispatchToProps)(MetaCIA)
