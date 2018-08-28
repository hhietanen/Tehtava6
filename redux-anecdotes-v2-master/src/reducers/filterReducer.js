
const filter = ' '


const filterReducer = (state = filter, action) => {
  switch (action.type) {
    case 'CHANGE':
      console.log('You changed filter to: '+ action.name)
    return action.name
        
    case 'REMOVE':
    return ' '
    
    default:
    return state
  }
}


// Action creators
export const changeFilter = (name) => {
  console.log('change filter triggered')
  return { 
      type: 'CHANGE', 
      name 
    }
}




export default filterReducer