
const notification = 'Ilmoitukset tulevat tähän'


const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'NOTE':
    	const content = 'You voted: '+ action.name
      return content
    case 'ADDED':
    	const content2 = 'You added the following new anecdote: ' + action.name
    return content2
    case 'CLEAR':
    return null

    default:
      return null
  }
return state
}


// Action creators
export const votingNoted = (name) => {
  console.log('voting notification triggered')
  return { 
      type: 'NOTE', 
      name 
    }
}


export const addingNoted = (name) => {
  console.log('adding notification triggered')
  return { 
      type: 'ADDED', 
      name 
    }
}

export const clearVoting = () => {
  console.log('null notification triggered')
  return { 
      type: 'CLEAR' 
    }
}


export default notificationReducer