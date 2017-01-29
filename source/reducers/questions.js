import {createStore} from 'redux'

export const questions = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_QUESTIONS':
    return [
      action.questions,
      ...state
    ]
  case 'DELETE_QUESTIONS':
    return [
      ...state
    ].filter( e => (e.id !== action.id))
  case 'UPDATE_QUESTIONS':
  default:
    return state
  }
}


export default questions

