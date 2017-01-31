import React, {Component} from 'react'
import Landing from './Landing';
import MainLogin from './MainLogin';
import Signin from './Signin'
import BrandContent from './BrandContent'

export default class Brand extends Component {
  render() {
    return (
      <div className="brand-wrapper">
        <div style={{minHeight: '120vh'}}>
          <Landing />
          <MainLogin />
        </div>
        <div className="ads">
        <div className="back-white">
          <div className="brand-content-wrapper">
            <div className="content-right">
              <h2>
                이불 밖은 위험해?
              </h2>
              <h6 className="text-muted">
                CIA에 가입하는 이유는 단 하나, 편안하기 때문입니다. <br /> CIA는 자유로운 학내 최대 규모 만화동아리입니다. 
              </h6>
            </div>
            <div className="brand-bottom-image">
              <img 
                className="door"
                src="http://cia.kw.ac.kr:3001/static/door.png"/>
            </div>
          </div>
        </div>
        <div className="back-gray">
          <div className="brand-content-wrapper">
            <div className="content-left">
              <h2>
                만화, 또 만화
              </h2>
              <h6 className="text-muted">
                그리고 만화. <br /> CIA 회원이라면 누구나, 언제라도 읽을 수 있습니다. 
              </h6>
            </div>
            <div className="brand-bottom-image" style={{right:"0"}}>
              <img 
                className="books"
                src="http://cia.kw.ac.kr:3001/static/books.jpg"/>
            </div>
          </div>
        </div>
        <div className="back-aliceblue">
          <div className="brand-content-wrapper-3">
            <div className="content-right">
              <h2>
                전 세계 고객들과 연결됩니다.
              </h2>
              <h6 className="text-muted">
                고객이 어디에 있든 간편하게 결제가 가능합니다. <br /> 
                고객은 페이팔은 물론, 신용카드나 직불카드로 결제할 수 있습니다.
              </h6>
            </div>
            <div className="brand-bottom-image">
              <img 
                width="520px"
                className="tv"
                src="http://cia.kw.ac.kr:3001/static/tv_with_cia.jpg"/>
            </div>
          </div>
        </div>
        </div>
        <Signin />
      </div>
    )
  }
}
