const userInfoAtStart = [
  {
    user: '',
    password: '',
    name: '',
    id: '',
    loggedIn: false,
  },
]

const initialState = userInfoAtStart

const userReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return Object.assign({}, store, {
      user: action.user, name: action.name, id: action.id, loggedIn: true,
    })

  case 'INPUT_USERNAME':
    return Object.assign({}, store, { user: action.input })

  case 'INPUT_PASSWORD':
    return Object.assign({}, store, { password: action.input })

  case 'LOGOUT_USER':
    return Object.assign({}, store, {
      user: '', password: '', name: '', id: '', loggedIn: false,
    })

  case 'INITIALIZE_USER':
    return Object.assign({}, store, {
      user: '', password: '', name: '', id: '', loggedIn: false,
    })
  case 'INITIALIZE_USERS':
    return action.data

  default:
    return store
  }
}

export const initializeUsers = () => ({
  type: 'INITIALIZE_USERS',
})

export const initializeUser = () => ({
  type: 'INITIALIZE_USER',
})

export const inputUsername = input => ({
  type: 'INPUT_USERNAME',
  input,
})

export const inputPassword = input => ({
  type: 'INPUT_PASSWORD',
  input,
})

export const loginUser = (user, name, id) => async (dispatch) => {
  dispatch({
    type: 'LOGIN_USER',
    user,
    name,
    id,
  })

  dispatch({
    type: 'SUCCESS_NOTIFICATION',
    message: `Logged in as ${name}`,
  })

  setTimeout(() => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      content: '',
    })
  }, 1000) // Welcome Header hoitaa tämän jo, joten siivotaan tämä nopeasti pois
}

export const logoutUser = name => async (dispatch) => {
  dispatch({
    type: 'LOGOUT_USER',
  })

  dispatch({
    type: 'SUCCESS_NOTIFICATION',
    message: `Goodbye ${name}`,
  })

  setTimeout(() => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      content: '',
    })
  }, 5000)
}

export default userReducer
