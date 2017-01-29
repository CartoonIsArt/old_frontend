import {createStore} from 'redux'

export const me = (state={}, action) => {
  switch(action.type) {
  case 'CREATE_ME':
    return action.me
  case 'REMOVE_ME':
    return {}
  default:
    return state
  }
}


export default me

