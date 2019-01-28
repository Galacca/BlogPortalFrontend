import usersService from '../services/usersService'

const usersReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
    return async (dispatch) => {
      try{
        const users = await usersService.getAll()
        dispatch({
          type: 'INIT_USERS',
          data: users,
            })
      } catch (exception){
        //Huom. En kutsu CLEAR_NOTIFICATION tarkoituksella. Kyseessä kuitenkin aika kriittinen virhe.
        console.log(exception.message)
        dispatch({
          type: 'ERROR_NOTIFICATION',
          message: "Failed to retrieve userlist from server. " +exception.message
            })
      }

       
    }
  }

  /*
export const initializeUsers = () => {
  return async (dispatch) => {
    userService.getAll().then(users =>
      dispatch({
        type: 'INITIALIZE_USERS',
        users
      })
    )

  }
}

*/

export default usersReducer