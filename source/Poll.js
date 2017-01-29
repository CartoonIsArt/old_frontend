import React, {Component} from 'react'

export default class Poll extends Component{
  render(){
    return (
      <div>
        <h3>설문</h3>
        <p className="pt-running-text">
          Lots of people use React as the V in MVC. Since React makes no assumptions about the
          rest of your technology stack, it's easy to try it out on a small feature in an existing
          project.
        </p>
      </div>
    )
  }
}
