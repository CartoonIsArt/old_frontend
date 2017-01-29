import {createStore} from 'redux'

export const chimebells = (state=[], action) => {
  switch(action.type) {
  case 'CREATE_CHIMEBELLS':
    return action.chimebells
  case 'PUSH_CHIMEBELLS':
    return [
      action.chimebells,
      ...state
    ]
  case 'DELETE_CHIMEBELLS':
    return [
      ...state
    ].filter( e => (e.id != action.chimebells.id))
  case 'UPDATE_CHIMEBELLS':
    var res = [...state].map( e => {
      var temp = e
      action.chimebells.forEach( chimebell => {
        if(e.id == chimebell.id) {
          temp = chimebell
        }
      })
      return temp
    })
    const idset = res.map(e => (e.id))
    action.chimebells.forEach( e => {
      if(!idset.includes(e.id)) {
        res = res.concat([e])
      }
    })
    return res
  default:
    return state
  }
}


export default chimebells

