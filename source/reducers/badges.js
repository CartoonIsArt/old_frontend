import {createStore} from 'redux'

export const badges = (state=[], action) => {
  switch(action.type) {
  case 'UPDATE_BADGES':
    return [
      ...state
    ].filter( e => e.id != action.badges.id).concat([action.files])
  default:
    return state
  }
}


export default badges

