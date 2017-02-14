import React, {Component} from 'react'
import MyNavBar from './MyNavBar'

export default class Donations extends Component {
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
              <h4 className="card-title"> <strong> CIA - Hall of Fame으로 모십니다 </strong> </h4>
              <p> CIA - Hall of Fame은 동아리 활동인구의 더 나은 활동을 위해 일정 금액을 기부해주신 선배님들로, 후원회원을 예우하고 기리기 위하여 설립하였습니다. </p>
              <p> 최초로 동아리의 정기후원자가 되신 5기 이요한선배님께서 함께하십니다. </p>
            </div>
            <div className="card-block">
              <h6 className="card-text"> <strong> Hall of Fame 구분 </strong> </h6>
              <p> 정기후원자: 연간 6만 원 이상 기부한 후원자 </p>
              <p> 예비후원자: 향후 1년 이내에 6만원 이상 기부하기로 약정한 후원자 </p>
            </div>
            <div className="card-block">
              <h6 className="card-text"> <strong> Hall of Fame 예우 </strong> </h6>
              <p> Hall of Fame에 등록하시면 동아리에서 발간하는 회지를 받아보실 수 있습니다 </p>
              <p> 후원자로 등록하실 경우에는 후원자 뱃지 <span className="badge badge-success"> ★ </span> 를 달아드립니다</p>
            </div>
            <div className="card-block">
              <h6 className="card-text"> <strong> Hall of Fame 등록 절차 </strong> </h6>
              <p> Step 1. Hall of Fame 가입 및 기부방법에 대해 문의합니다. </p>
              <p> Step 2. 후원하고자 하는 방식에 대해 총무와 협의합니다. </p>
              <p> Step 3. 후원자로 등록된 것을 확인하고, 후원금 사용내역 등을 확인합니다. </p>
            </div>
            <div className="card-block">
              <p> 926102-01-540380 국민은행 임세민 </p>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
