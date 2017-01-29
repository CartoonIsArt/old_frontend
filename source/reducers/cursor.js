import {createStore} from 'redux'

export const cursor = (state={}, action) => {
  switch(action.type) {
  case 'CREATE_CURSOR':
    return {next: action.cursor}
  case 'REMOVE_CURSOR':
    return {}
  default:
    return state
  }
}


export default cursor

