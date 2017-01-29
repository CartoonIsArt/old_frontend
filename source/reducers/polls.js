import {createStore} from 'redux'

export const polls = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_POLLS':
    return [
      action.polls,
      ...state
    ]
  case 'DELETE_POLLS':
    return [
      ...state
    ].filter( e => (e.id !== action.id))
  case 'UPDATE_POLLS':
  default:
    return state
  }
}


export default polls

