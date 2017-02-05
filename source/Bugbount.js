import React, {Component} from 'react'
import MyNavBar from './MyNavBar'

export default class Bugbount extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <MyNavBar />
        <div className="container">
          <div className="create-rock card">
            <div className="card-block">
              <h4 className="card-title"> 모던 동게 베타테스터를 환영합니다! </h4>
            </div>
            <div className="card-block">
              <h5 className="card-text"> 1. '너'의 경험이 제일 중요합니다 </h5>
              <h6 className="card-text"> '어, 이거 이상한데?', '흠, 이건 좀 불편하네.' 등 당신의 모든 경험을 이곳에 기록해주세요. </h6>
            </div>
            <div className="card-block">
              <h5 className="card-text"> 2. '너'의 건의는 바로 반영됩니다 </h5>
              <h6 className="card-text"> 건의한 내용은 수시로 검토되고 반영됩니다.  </h6>
            </div>
            <div className="card-block">
              <h5 className="card-text"> 3. 모던 동게에 '너'의 이름이 새겨집니다 </h5>
              <h6 className="card-text"> 동아리를 위해 동게에 기여해준 당신을 영원히 기억합니다. </h6>
            </div>
            <div className="card-block">
              <h5 className="card-text">  * 찾은 버그 </h5>
              <p>
                <strong> 17기 박재범 - 9개 - awesome! </strong> <br />
                13기 강깊은 - 5개 <br />
                18기 김민정 - 5개 <br />
                17기 김은성 - 4개 <br />
                18기 홍원근 - 3개 <br />
                11기 김영원 - 3개 <br />
              </p>
            </div>
            <div className="card-block">
              <a target="_blank" href="https://www.github.com/kswgit/shyA-front">
              동아리 게시판 오픈소스 바로가기
              </a>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
