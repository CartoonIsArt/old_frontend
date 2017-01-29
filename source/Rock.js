import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getFiles, getMembers} from './actions'
import ProfileImage from './ProfileImage'
import moment from 'moment'
import {youtube_parser} from './Youtube'

class Rock extends Component {
  constructor(props) {
    super(props)
    this.props.imgId &&
    this.props.files.filter(e => e.id == this.props.imgId).length === 0 &&
    this.props.getFiles(this.props.imgId)
    this.props.members.filter(e => e.id == this.props.author).length === 0 &&
    this.props.getMembers(this.props.author)
  }

  render() {
    return (
      <div className={!this.props.isRead ? "card main-rock rock-unread" : "card main-rock rock-read"}>
        {
          this.props.imgId ?
          <ProfileImage
            wrapperClass="rock-image-wrapper"
            imgClass="rock-image"
            imgId={this.props.imgId}
          />
          :
          youtube_parser(this.props.text) ?
          <div className="rock-image-wrapper">
            <img className="rock-image"
              src={`https://img.youtube.com/vi/${youtube_parser(this.props.text)}/0.jpg`}
              alt="youtube"
            />
          </div>
          :
          <div className="rock-basicimage">
            CIA
          </div>
        }
        {
          this.props.title &&
            <div className="card-block">
              <h4 className="card-title rocks-title"> {this.props.title} </h4>
            </div>
        }
        <div className="card-row"> </div>
        <div className="card-block">
          <h6 className="card-text rocks-text"> 
          {
            this.props.members
            .filter( e => e.id == this.props.author)
            .map(e => 
            <div key={e.id}>
              <ProfileImage
                wrapperClass="rocks-profile-wrapper"
                imgClass="rocks-profile"
                imgId={e.profile_image}           />
              <div className="rocks-profile-block">
                <div className="rocks-profile-name text-softblack">
                  <small> {e.last_name} </small>
                </div>
                <div className="rocks-profile-time text-muted">
                  <small> 
                    { moment() - moment(this.props.createdDate) < 24 * 60 * 60 * 1000 ? 
                      moment(this.props.createdDate).locale('ko').fromNow() :
                      moment(this.props.createdDate).locale('ko').format('MMMM Do LT')}
                  </small>
                </div>
              </div>
            </div>
            )
          }
          </h6>
        </div>
    </div>
    );
  }
}
Rock.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  members: state.members,
  files: state.files
})

const mapDispatchToProps = ({
  getMembers,
  getFiles
})

export default connect(mapStateToProps, mapDispatchToProps)(Rock)
