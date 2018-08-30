
const notification = 'Ilmoitukset tulevat tähän'


const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'NOTE':
    	const content = 'You voted / added: '+ action.name
    return content
        
    case 'CLEAR':
    return ' '
    
    default:
    return ' '
  }
//return state
}


// Action creators

export const notify = (name, time) => {
  console.log('notify notification triggered')
  return async (dispatch) => { 
    dispatch({
      type: 'NOTE', 
      name
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*100)

  }
}


export default notificationReducer