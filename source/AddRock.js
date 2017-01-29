import React, {Component} from 'react';
import {Link} from 'react-router';


export default class AddRock extends Component {
  render() {
    return (
      <Link to="/create">
        <div className="add-rock" >
          <div className="cross-x"> </div>
          <div className="cross-y"> </div>
        </div>
      </Link>
    )
  }

}
