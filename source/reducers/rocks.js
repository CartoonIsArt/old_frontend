import {createStore} from 'redux'

export const rocks = (state=[], action) => {
  switch(action.type) {
  case 'CREATE_ROCKS':
    return action.rocks
  case 'APPEND_ROCK':
    return [
      ...state,
      action.rocks
    ]
  case 'PUSH_ROCK':
    return [
      action.rocks,
      ...state
    ]
  case 'PUSH_ROCKS':
    return state.concat(action.rocks)
  case 'DELETE_ROCKS':
    return [
      ...state
    ].filter( e => e.id != action.rocks.id)
  case 'DELETE_PUSH_ROCKS':
    var idset = action.rocks.map(e => e.id)
    var res = [...state].filter(e => !idset.includes(e.id))
    return action.rocks.concat(res)
  case 'UPDATE_PUSH_ROCKS':
    var res = [...state].map( e => {
      var temp = e
      action.rocks.forEach( rock => {
        if(e.id == rock.id) {
          temp = rock
        }
      })
      return temp
    })
    var idset = res.map(e => (e.id))
    action.rocks.forEach( e => {
      if(!idset.includes(e.id)) {
        res = res.concat([e])
      }
    })
    return res
  case 'UPDATE_ROCKS':
    var res = [...state].map( e => {
      var temp = e
      action.rocks.forEach( rock => {
        if(e.id == rock.id) {
          temp = rock
        }
      })
      return temp
    })
    var idset = res.map(e => (e.id))
    action.rocks.forEach( e => {
      if(!idset.includes(e.id)) {
        res = res.concat([e])
      }
    })
    return res
  default:
    return state
  }
}


export default rocks

