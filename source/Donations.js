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
              <h4 className="card-title"> 후원 </h4>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
