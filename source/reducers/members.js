import {createStore} from 'redux'
import {sort} from 'timsort'

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
        if(action.members.isActive !== undefined) {e.isActive = action.members.isActive}
        if(action.members.isContributer !== undefined) {e.isContributer = action.members.isContributer}
        if(action.members.isAnon !== undefined) {e.isAnon = action.members.isAnon}
        if(action.members.isGraduate !== undefined) {e.isGraduate = action.members.isGraduate}
        if(action.members.is_staff !== undefined) {e.is_staff = action.members.is_staff}
        if(action.members.isRegularMember !== undefined) {e.isRegularMember = action.members.isRegularMember}
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
  case 'SORT_MEMBERS':
    res = [...state]
    sort(res, action.members)
    return res
  default:
    return state
  }
}


export default members

