import React, {Component} from 'react'
import MyNavBar from './MyNavBar'

export default class Laws extends Component {
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
              <h4 className="card-title"> 회칙 </h4>
              <h6 className="card-text"> 1조 </h6>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
