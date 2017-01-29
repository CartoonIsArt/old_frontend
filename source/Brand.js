import React, {Component} from 'react'
import Landing from './Landing';
import MainLogin from './MainLogin';
import Signin from './Signin'

export default class Brand extends Component {
  render() {
    return (
      <div className="brand-wrapper">
        <div style={{minHeight: '120vh'}}>
          <Landing />
          <MainLogin />
        </div>
        <Signin />
      </div>
    )
  }
}
