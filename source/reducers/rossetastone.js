import {createStore} from 'redux'

export const rossetastone = (state=[], action) => {
  switch(action.type) {
  case 'CREATE_ROSSETASTONE':
    return action.rossetastone
  case 'PUSH_ROSSETASTONE':
    return [
      action.rossetastone,
      ...state
    ]
  case 'DELETE_ROSSETASTONE':
    return [
      ...state
    ].filter( e => (e.id !== action.id))
  case 'UPDATE_ROSSETASTONE':
  default:
    return state
  }
}


export default rossetastone

