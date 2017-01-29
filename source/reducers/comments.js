import {createStore} from 'redux'

export const comments = (state=[], action) => {
  switch(action.type) {
  case 'PUSH_COMMENTS':
    return [
      ...state,
      action.comments
    ]
  case 'DELETE_COMMENTS':
    return [
      ...state
    ].filter( e => (e.id != action.comments.id))
  case 'UPDATE_COMMENTS':
    if (Array.isArray(action.comments)) {
      const idset = action.comments.map(e => (e.id))
      return [...state
      ]
      .filter(e => (
        !(idset.includes(e.id))
      ))
      .concat(action.comments)
    }
    return [ ...state ]
    .filter(e => (e.id != action.comments.id))
    .concat([action.comments])
  default:
    return state
  }
}


export default comments

