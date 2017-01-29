import {createStore} from 'redux'

export const tag = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_TAG':
    return [
      action.tag,
      ...state
    ]
  case 'DELETE_TAG':
    return [
      ...state
    ].filter( e => (e.id !== action.id))
  case 'UPDATE_TAG':
  default:
    return state
  }
}


export default tag

