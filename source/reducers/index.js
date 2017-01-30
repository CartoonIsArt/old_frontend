import {combineReducers} from 'redux'
import files from './files'
import questions from './questions'
import members from './members'
import rocks from './rocks'
import chimebells from './chimebells'
import polls from './polls'
import comments from './comments'
import thumbs from './thumbs'
import rossetastone from './rossetastone'
import tag from './tag'
import me from './me'
import meta from './meta'
import cursor from './cursor'

const rootReducer = combineReducers({
  files,
  questions,
  members,
  rocks,
  chimebells,
  polls,
  comments,
  thumbs,
  rossetastone,
  tag,
  me,
  meta,
  cursor,
})


const shyAReducer = (state, action) =>  {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return rootReducer(state, action)
}

export default shyAReducer
