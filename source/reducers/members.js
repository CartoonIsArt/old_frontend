import {createStore} from 'redux'

export const members = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_MEMBERS':
    return [
      action.members,
      ...state
    ]
  case 'DELETE_MEMBERS':
    return [
      ...state
    ].filter( e => (e.id != action.members.id))
  case 'MODIFY_MEMBERS':
    return [
      ...state
    ].map(e => {
      if (e.id == action.members.id) {
        return action.members
      }
      return e
    })
  case 'UPDATE_MEMBERS':
    var res = [...state].map (e => {
      var temp = e
      action.members.forEach(member => {
        if(e.id == member.id) {
          temp = member
        }
      })
      return temp
    })
    const idset = res.map(e  => e.id)
    action.members.forEach(e => {
      if(!idset.includes(e.id)) {
        res = res.concat([e])
      }
    })
    return res
  default:
    return state
  }
}


export default members

