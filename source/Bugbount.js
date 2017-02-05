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
              <h4 className="card-title"> 너를 위한 동게, 모-던 동게 </h4>
            </div>
            <div className="card-block">
              <img src="https://cia.kw.ac.kr/media/3bd0dc69-8aa6-49cb-8b6e-fa049ecad302.gif"
                style={{maxWidth: "100%"}}
              />
            </div>
            <div className="card-block">
              <h5 className="card-text"> 1. 간편한 활동인구 신청 </h5>
              <h6 className="card-text text-muted"> 그저 버튼 클릭 한 번으로 간편하게 활동인구 신청을 할 수 있습니다. </h6>
            </div>
            <div className="card-block">
              <h5 className="card-text"> 2. 빠른 속도 </h5>
              <h6 className="card-text text-muted"> 데이터 요청 시 먼저 보여주고, 처리는 미루어 속도가 크게 향상되었습니다. </h6>
            </div>
            <div className="card-block">
              <h5 className="card-text"> 3. 안전한 통신 </h5>
              <h6 className="card-text text-muted"> 당신의 모든 통신은 암호화됩니다. </h6>
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
