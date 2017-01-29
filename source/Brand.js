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
        <BrandContent
          rightsideClass="brand-text-right"
          rightsideContent={(<div> message 1 </div>)}
          leftsideClass="brand-picture-left"
          leftsideContent={(<div> picture 1 </div>)}
        />
        <BrandContent
          wrapperClass="brand-content-wrapper-2"
          rightsideClass="brand-picture-right"
          rightsideContent={(<div> picture 2 </div>)}
          leftsideClass="brand-text-left"
          leftsideContent={(<div> message 2</div>)}
        />
        <BrandContent
          wrapperClass="brand-content-wrapper-3"
          rightsideClass="brand-text-right"
          rightsideContent={(<div> message 3 </div>)}
          leftsideClass="brand-picture-left"
          leftsideContent={(<div> picture 3 </div>)}
        />
        <Signin />
      </div>
    )
  }
}
