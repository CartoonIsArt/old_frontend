export const CREATE_META = 'CREATE_META'


export const CREATE_ROCKS = 'CREATE_ROCKS'
export const PUSH_ROCKS = 'PUSH_ROCKS'
export const PUSH_ROCK = 'PUSH_ROCK'
export const DELETE_PUSH_ROCKS = 'DELETE_PUSH_ROCKS'
export const APPEND_ROCK = 'APPEND_ROCK'
export const UPDATE_ROCKS = 'UPDATE_ROCKS'
export const UPDATE_PUSH_ROCKS = 'UPDATE_PUSH_ROCKS'
export const REMOVE_ROCKS = 'DELETE_ROCKS'

export const PUSH_FILES = 'PUSH_FILES'
export const UPDATE_FILES = 'UPDATE_FILES'
export const REMOVE_FILES = 'DELETE_FILES'

export const PUSH_POLLS = 'PUSH_POLLS'
export const UPDATE_POLLS = 'UPDATE_POLLS'
export const REMOVE_POLLS = 'DELETE_POLLS'

export const PUSH_MEMBERS = 'PUSH_MEMBERS'
export const MODIFY_MEMBERS = 'MODIFY_MEMBERS'
export const UPDATE_MEMBERS = 'UPDATE_MEMBERS'
export const REMOVE_MEMBERS = 'DELETE_MEMBERS'
export const SORT_MEMBERS = 'SORT_MEMBERS'

export const PUSH_CHIMEBELLS = 'PUSH_CHIMEBELLS'
export const UPDATE_CHIMEBELLS = 'UPDATE_CHIMEBELLS'
export const REMOVE_CHIMEBELLS = 'DELETE_CHIMEBELLS'
export const CREATE_CHIMEBELLS = 'CREATE_CHIMEBELLS'

export const PUSH_QUESTIONS = 'PUSH_QUESTIONS'
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS'
export const REMOVE_QUESTIONS = 'DELETE_QUESTIONS'

export const PUSH_COMMENTS = 'PUSH_COMMENTS'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const REMOVE_COMMENTS = 'DELETE_COMMENTS'

export const PUSH_THUMBS = 'PUSH_THUMBS'
export const UPDATE_THUMBS = 'UPDATE_THUMBS'
export const REMOVE_THUMBS = 'DELETE_THUMBS'

export const CREATE_ROSSETASTONE = 'CREATE_ROSSETASTONE'
export const PUSH_ROSSETASTONE = 'PUSH_ROSSETASTONE'
export const UPDATE_ROSSETASTONE = 'UPDATE_ROSSETASTONE'
export const REMOVE_ROSSETASTONE = 'DELETE_ROSSETASTONE'

export const PUSH_TAG = 'PUSH_TAG'
export const UPDATE_TAG = 'UPDATE_TAG'
export const REMOVE_TAG = 'DELETE_TAG'

export const CREATE_ME = 'CREATE_ME'
export const REMOVE_ME = 'REMOVE_ME'

export const CREATE_CURSOR = 'CREATE_CURSOR'
export const REMOVE_CURSOR = 'REMOVE_CURSOR'

export const createMeta = meta => ({type: CREATE_META, meta})

export const createRocks = rocks => ({type: CREATE_ROCKS, rocks})
export const deletePushRocks = rocks => ({type: DELETE_PUSH_ROCKS, rocks})
export const pushRocks = rocks => ({type: PUSH_ROCKS, rocks})
export const pushRock = rocks => ({type: PUSH_ROCK, rocks})
export const appendRock = rocks => ({type: APPEND_ROCK, rocks})
export const updateRocks = rocks => ({type: UPDATE_ROCKS, rocks})
export const updatePushRocks = rocks => ({type: UPDATE_PUSH_ROCKS, rocks})
export const removeRocks = rocks => ({type: REMOVE_ROCKS, rocks})

export const pushFiles = files => ({type: PUSH_FILES, files})
export const updateFiles = files => ({type: UPDATE_FILES, files})
export const removeFiles = files => ({type: REMOVE_FILES, files})

export const pushQuestions = questions => ({type: PUSH_QUESTIONS, questions})
export const updateQuestions = questions => ({type: UPDATE_QUESTIONS, questions})
export const removeQuestions = questions => ({type: REMOVE_QUESTIONS, questions})

export const pushMembers = members => ({type: PUSH_MEMBERS, members})
export const modifyMembers = members => ({type: MODIFY_MEMBERS, members})
export const updateMembers = members => ({type: UPDATE_MEMBERS, members})
export const removeMembers = members => ({type: REMOVE_MEMBERS, members})
export const sortingMembers = members => ({type: SORT_MEMBERS, members})

export const createChimebells = chimebells => ({type: CREATE_CHIMEBELLS, chimebells})
export const pushChimebells = chimebells => ({type: PUSH_CHIMEBELLS, chimebells})
export const updateChimebells = chimebells => ({type: UPDATE_CHIMEBELLS, chimebells})
export const removeChimebells = chimebells => ({type: REMOVE_CHIMEBELLS, chimebells})

export const pushPolls = polls => ({type: PUSH_POLLS, polls})
export const updatePolls = polls => ({type: UPDATE_POLLS, polls})
export const removePolls = polls => ({type: REMOVE_POLLS, polls})

export const pushComments = comments => ({type: PUSH_COMMENTS, comments})
export const updateComments = comments => ({type: UPDATE_COMMENTS, comments})
export const removeComments = comments => ({type: REMOVE_COMMENTS, comments})

export const pushThumbs = thumbs => ({type: PUSH_THUMBS, thumbs})
export const updateThumbs = thumbs => ({type: UPDATE_THUMBS, thumbs})
export const removeThumbs = thumbs => ({type: REMOVE_THUMBS, thumbs})

export const createRossetaStone = rossetastone => ({type: CREATE_ROSSETASTONE, rossetastone})
export const pushRossetaStone = rossetastone => ({type: PUSH_ROSSETASTONE, rossetastone})
export const updateRossetaStone = rossetastone => ({type: UPDATE_ROSSETASTONE, rossetastone})
export const removeRossetaStone = rossetastone => ({type: REMOVE_ROSSETASTONE, rossetastone})

export const pushTag = tag => ({type: PUSH_TAG, tag})
export const updateTag = tag => ({type: UPDATE_TAG, tag})
export const removeTag = tag => ({type: REMOVE_TAG, tag})

export const createMe  = me => ({type: CREATE_ME, me})
export const removeMe  = me => ({type: REMOVE_ME, me})

export const createCursor = cursor => ({type: CREATE_CURSOR, cursor})
export const removeCursor = cursor => ({type: REMOVE_CURSOR, cursor})

const getCookie = name => {
  var cookieValue = null
  if(document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i])
      if(cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break;
      }
    }
  }
  return cookieValue
}

const host = 'https://cia.kw.ac.kr/api'
const headers = (method, body) => {
  const token = getCookie('csrftoken')
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Method': '*',
      'Access-Control-Request-Headers': '*',
      'X-Requested-With': 'JSONHttpRequest',
      'X-CSRFToken': token,
    },
    method: method,
    body: body,
    credentials: 'include'
  }
}

export const isExistUsername = body => dispatch => {
  return fetch(host + '/existence/?username=' + body.username, headers("GET"))
  .then(res => res.json()
  .then( json => json))
}

export const signin = body => dispatch => {
  return fetch(host + '/signin/', headers("POST", JSON.stringify(body)))
  .then(res => {
     return res.status
  })
  .catch(s => {
    console.log(s)
  })
    
}

export const login = body => dispatch => {
    return fetch(host + '/login/', {
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': '*',
        'Access-Control-Request-Headers': '*',
      },
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(body)
    }).then( res => {
      if (res.status === 201) {
        fetch(host + '/members/?username=' + body.username, headers("GET")).then(res => (
          res.json().then(json => {
            dispatch(createMe(json[0]))
          })))
      }
      return res.status
    })
    .catch( s => {
      console.log(s);
    });
}

export const whoami = () => dispatch => {
  return fetch(host + '/whoami/', headers("GET")).then(res => {
    return res.json().then(json => {
      dispatch(createMe(json))
      return res.status
    })
  })
}

export const logout = () => dispatch => {
    return fetch(host + '/logout/', {
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': '*',
        'Access-Control-Request-Headers': '*',
      },
    credentials: 'include',
      method: "POST",
    }).then( res => {
      dispatch(removeMe())
    })
    .catch( s => {
      console.log(s);
    });
}

export const getIndexPageRocks = () => dispatch => {
  return fetch(host + '/rocks/?has_parent=False', headers("GET"))
  .then( res => {
    return res.status === 500 ? res.status :
    res.json()
    .then( json => {
      dispatch(deletePushRocks(json.results))
      dispatch(createCursor(json.next))
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  })
}

export const getRocksBySearch = (keyword) => dispatch => {
  return fetch(host + '/rocks/?has_parent=False&search=' + keyword, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(createRocks([]))
      dispatch(createRocks(json.results))
      dispatch(createCursor(json.next))
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  })
}

export const getMeta = () => dispatch => {
  return fetch(host + '/meta/', headers("GET"))
  .then(res => res.json()
    .then(json => dispatch(createMeta(json)))
  )
}

export const getRocks = (id = 1) => dispatch => {
  return fetch(host + '/rocks/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateRocks([json]))
      return json
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const getRocksByURL = (url) => dispatch => {
  return fetch(url, headers("GET")).then( res => {
    return res.json().then( json => {
      Array.isArray(json.results) ? dispatch(updateRocks(json.results)) : dispatch(updateRocks([json.results]))
      dispatch(createCursor(json.next))
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const getRocksByParent = (parentId) => dispatch => {
  return fetch(host + '/rocks/?ordering=write_date&parent_rock=' + parentId, headers("GET")).then( res => {
    return res.json().then( json => {
      json.results.length != 0 && dispatch(updatePushRocks(json.results))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const postRocks = (body, isPebble=false) => dispatch => {
  body.id = -1
  isPebble ? dispatch(appendRock(body)) :  dispatch(pushRocks([body]))
  return fetch(host + '/rocks/', headers("POST", JSON.stringify(body)))
  .then( res => (
    res.json().then( json => {
      dispatch(removeRocks({id: -1}))
      isPebble ? dispatch(appendRock(json)) :  dispatch(updateRocks([json]))
      return res.status
  })))
  .catch( s => {
    dispatch(removeRocks(body))
    console.log(s);
    return 500
  })
}

export const deleteRocks = (id) => dispatch => {
  dispatch(removeRocks({id: id}))
  return fetch(host + '/rocks/' + id + '/', headers("DELETE")).then( res => {
    return res.status
  })
  .catch( s => {
    console.log(s);
    getRocks(id)
    return 500
  });
}

export const getFiles = (id = 1) => dispatch => {
  return fetch(host + '/files/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      Array.isArray(json) ? console.log('getFiles_ERROR') :  dispatch(updateFiles(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
/*
export const getFilesByURL = (url) => dispatch => {
  return fetch(url, headers("GET")).then( res => {
    return res.json().then( json => {
      Array.isArray(json) ? console.log('getFilesByURL_ERROR') :  dispatch(updateFiles(json))
      return json
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}*/

export const putFiles = (body) => dispatch => {
  return fetch(host + '/upload/' + body.name, headers("PUT", body)).then( res => {
    return res.json().then( json => {
      dispatch(pushFiles(json))
      return json
    })
  })
  .catch( s => {
    console.log(s)
    dispatch(deleteFiles(body.id))
    return 500
  });
}

export const deleteFiles = (id) => dispatch => {
  dispatch(removeFiles({id: id}))
  return fetch(host + '/files/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getFiles(id)
    return 500
  });
}


export const getQuestions = (id = 1) => dispatch => {
  return fetch(host + '/questions/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushQuestions(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const deleteQuestions = (id) => dispatch => {
  dispatch(removeQuestions({id: id}))
  return fetch(host + '/questions/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getQuestions(id)
    return 500
  });
}

export const getMembers = (id = '') => dispatch => {
  return fetch(host + '/members/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      Array.isArray(json) ? dispatch(updateMembers(json)) : dispatch(updateMembers([json]))
      return json
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const getAllMembers = () =>  dispatch => {
  return fetch(host + '/members/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateMembers(json))
      return json
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
/*
export const getMembersByURL = (url) => dispatch => {
  return fetch(url, headers("GET")).then( res => {
    return res.json().then( json => {
      Array.isArray(json) ? dispatch(updateMembers(json)) : dispatch(updateMembers([json]))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}*/
export const patchMembers = (body) => dispatch => {
  dispatch(modifyMembers(body))
  return fetch(host + '/members/' + body.id + '/', headers("PATCH", JSON.stringify(body)))
  .then( res => {
    return res.status
  })
  .catch( s => {
    getAllMembers()
    console.log(s);
    return 500
  })
}
export const deleteMembers = (id) => dispatch => {
  dispatch(removeMembers({id: id}))
  return fetch(host + '/members/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getMembers(id)
    return 500
  });
}

export const sortMembers = func => dispatch => {
  dispatch(sortingMembers(func))
}

export const getChimebells = (id = 1) => dispatch => {
  return fetch(host + '/chimebells/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushChimebells(json.results))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const getChimebellsByToMemberId = (toMemberId) => dispatch => {
  return fetch(host + '/chimebells/?to_member=' + toMemberId, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(createChimebells(json.results))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const postChimebells = (body) => dispatch => {
  if (body.from_member == body.to_member) {
    return
  }
  fetch(host + '/chimebells/', headers("POST", JSON.stringify(body)))
  .then( res => (
    res.status
  ))
  .catch( s => {
    console.log(s);
    return 500
  })
}
export const patchChimebellsConfirm = id => dispatch => {
  return fetch(host + '/chimebells/' + id + '/', headers("PATCH", JSON.stringify({id})))
  .then( res => {
    return res.status
  })
  .catch( s => {
    getChimebells(id)
    console.log(s);
    return 500
  })
}
export const deleteChimebells = (id) => dispatch => {
  dispatch(removeChimebells({id: id}))
  return fetch(host + '/chimebells/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getChimebells(id)
    return 500
  });
}

export const getPolls = (id = 1) => dispatch => {
  return fetch(host + '/polls/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushPolls(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const deletePolls = (id) => dispatch => {
  dispatch(removePolls({id: id}))
  return fetch(host + '/polls/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getPolls(id)
    return 500
  });
}

export const getComments = (id = 1) => dispatch => {
  return fetch(host + '/comments/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushComments(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const getCommentsByRockId = (rockId = 1) => dispatch => {
  return fetch(host + '/comments/?rockId=' + rockId, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateComments(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const getCommentsByParentComment = (commentId) => dispatch => {
  return fetch(host + '/comments/?parent_comment=' + commentId, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateComments(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const postComments = (body) => dispatch => {
  var tempId = -Math.floor(Math.random() * 1000)
  body.id = tempId
  dispatch(pushComments(body))
  return fetch(host + '/comments/', headers("POST", JSON.stringify(body)))
  .then( res => {
    return res.json().then( json => {
      dispatch(removeComments({id: tempId}))
      dispatch(pushComments(json))
    })
  })
  .catch( s => {
    dispatch(removeComments(body))
    console.log(s);
    return 500
  })
}
export const deleteComments = (id) => dispatch => {
  dispatch(removeComments({id: id}))
  return fetch(host + '/comments/' + id + '/', headers("DELETE")).then( res => {
    return res.status
  })
  .catch( s => {
    console.log(s);
    getComments(id)
    return 500
  });
}

export const getThumbs = (id = 1) => dispatch => {
  return fetch(host + '/thumbs/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateThumbs(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const getThumbsByRock = (rockId) => dispatch => {
  return fetch(host + '/thumbs/?rock=' + rockId, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(updateThumbs(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}
export const postThumbs = (body) => dispatch => {
  dispatch(updateThumbs([body]))
  return fetch(host + '/thumbs/', headers("POST", JSON.stringify(body)))
  .then( res => (
    res.json().then( json => {
      getThumbsByRock(body.rock)
      return json.id
  })))
  .catch( s => {
    dispatch(removeThumbs(body))
    console.log(s);
    return 500
  })
}



export const deleteThumbs = (body) => dispatch => {
  dispatch(removeThumbs(body))
  return fetch(host + '/thumbs/' + body.id + '/', headers("DELETE")).then( res => {
    return res.status
  })
  .catch( s => {
    console.log(s);
    getThumbs(body.id)
    return 500
  });
}

export const getRossetaStone = () => dispatch => {
  return fetch(host + '/rossetastone/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(createRossetaStone(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const getRossetaStoneByMemberId = (id = 1) => dispatch => {
  return fetch(host + '/rossetastone/?member=' + id, headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushRossetaStone(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const postRossetaStone = (body) => dispatch => {
  return fetch(host + '/rossetastone/', headers("POST", JSON.stringify(body)))
  .then( res => (
    res.json().then( json => {
      dispatch(pushRossetaStone(json))
      return json.id
  })))
  .catch( s => {
    console.log(s);
    return 500
  })
}


export const deleteRossetaStone = (id) => dispatch => {
  dispatch(removeRossetaStone({id: id}))
  return fetch(host + '/rossetastone/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getRossetaStone(id)
    return 500
  });
}

export const getTag = (id = 1) => dispatch => {
  return fetch(host + '/tag/' + id + '/', headers("GET")).then( res => {
    return res.json().then( json => {
      dispatch(pushTag(json))
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    return 500
  });
}

export const deleteTag = (id) => dispatch => {
  dispatch(removeTag({id: id}))
  return fetch(host + '/tag/' + id + '/', headers("DELETE")).then( res => {
    return res.json().then( json => {
      return res.status
    })
  })
  .catch( s => {
    console.log(s);
    getTag(id)
    return 500
  });
}

