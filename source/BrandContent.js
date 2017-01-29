import React, {Component} from 'react'

export default class BrandContent extends Component {
  render() {
    return (
      <div className={this.props.wrapperClass ? this.props.wrapperClass : "brand-content-wrapper"}>
        <div className={this.props.contentClass ? this.props.contentClass : "brand-content"}>
          <span className={this.props.rightsideClass}>
            {this.props.rightsideContent}
          </span>
          <span className={this.props.leftsideClass}>
            {this.props.leftsideContent}
          </span>
        </div>
      </div>
    )
  }
}
