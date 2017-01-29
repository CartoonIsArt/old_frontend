import {createStore} from 'redux'

export const files = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_FILES':
    return [
      action.files,
      ...state
    ]
  case 'DELETE_FILES':
    return [
      ...state
    ].filter( e => (e.id != action.files.id))
  case 'UPDATE_FILES':
      return [
      ...state
    ].filter( e => e.id != action.files.id).concat([action.files])
  default:
    return state
  }
}


export default files

