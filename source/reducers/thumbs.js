import {createStore} from 'redux'

export const thumbs = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_THUMBS':
    return [
      action.thumbs,
      ...state
    ]
  case 'DELETE_THUMBS':
    return [
      ...state
    ].filter( e => {
      return e.member != action.thumbs.member || e.rock != action.thumbs.rock
    })
  case 'UPDATE_THUMBS':
    const memberset = action.thumbs.map(e => e.member)
    const rockset = action.thumbs.map(e => e.rock)
    return [...state].filter( e=> (
      !memberset.includes(e.member) || !rockset.includes(e.rock)
    )).concat(action.thumbs)
  default:
    return state
  }
}


export default thumbs

