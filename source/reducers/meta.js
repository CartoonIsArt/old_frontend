import {createStore} from 'redux'

export const meta = (state=[], action) => {
  switch(action.type) {
  case 'CREATE_META':
    return action.meta
  default:
    return state
  }
}


export default meta
