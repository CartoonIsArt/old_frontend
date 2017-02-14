import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getMembers} from './actions'
import ProfileImage from './ProfileImage'
import moment from 'moment'
import {youtube_parser} from './Youtube'
import Badge from './Badge'

class Rock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorId: "",
      authorName: "",
      authorProfileImageId: undefined,
      isAuthorStaff: false,
      authorBadges: [],
    }
    this.props.getMembers(this.props.author)
    .then(json => {
      this.setState({authorId: json.id})
      this.setState({authorName: json.last_name})
      this.setState({isAuthorStaff: json.is_staff})
      this.setState({authorProfileImageId: json.profile_image})
      this.setState({authorBadges: json.badges})
    })
  }

  render() {
    return (
      <div className={this.state.isAuthorStaff ? "card main-rock rock-unread" : "card main-rock rock-read"}>
        { //if has image
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
        { //if has title
          this.props.title &&
            <div className="card-block">
              <h5 className="card-title rocks-title"> {this.props.title} </h5>
            </div>
        }
        <div className="card-row"> </div>
        <div className="card-block rocks-summary">
          <h6 className="card-text rocks-text"> 
            {
            this.state.authorProfileImageId &&
            <ProfileImage
              wrapperClass="rocks-profile-wrapper"
              imgClass="rocks-profile"
              imgId={this.state.authorProfileImageId}           />
            }
            <div className="rocks-profile-block">
              <div className="rocks-profile-name text-softblack">
                <small> {this.state.authorName} </small>
                {
                  this.state.authorBadges &&
                  this.state.authorBadges.map( badge => (<Badge key={badge} badgeId={badge} />))
                }
              </div>
              <div className="rocks-profile-time text-muted">
                <span className="pt-icon pt-icon-history pt-icon-small">
                <small> 
                  { moment() - moment(this.props.touchedDate) < 24 * 60 * 60 * 1000 ? 
                    moment(this.props.touchedDate).locale('ko').fromNow() :
                    moment(this.props.touchedDate).locale('ko').format('MMMM Do LT')}
                </small>
                </span>
              </div>
            </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Rock)
