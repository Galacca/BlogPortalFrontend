/* eslint-disable no-case-declarations */
import blogService from '../services/blogService'

const blogReducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const oldVote = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    return [...oldVote, { ...voted, likes: voted.likes + 1 }]

  case 'DELETE':
    const oldDelete = store.filter(a => a.id !== action.id)
    return oldDelete

  case 'ADD':
    return store.concat(action.data)

  case 'INIT_BLOGS':
    return action.data

  default: return store
  }
}

// eslint-disable-next-line consistent-return
export const deleteBlog = (targetId, targetTitle) => {
  // eslint-disable-next-line no-alert
  const result = window.confirm('Poistetaanko käyttäjän tiedot?')
  if (result) {
    return async (dispatch) => {
      try {
        await blogService.remove(targetId)
        dispatch({
          type: 'DELETE',
          id: targetId,
        })
        dispatch({
          type: 'SUCCESS_NOTIFICATION',
          message: `Blog '${targetTitle}' deleted.`,
        })
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_NOTIFICATION',
            content: '',
          })
        }, 5000)
      } catch (exception) {
        dispatch({
          type: 'ERROR_NOTIFICATION',
          message: `Failed to delete blog.${exception}`,
        })
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_NOTIFICATION',
            content: '',
          })
        }, 5000)
      }
    }
  }
}

export const voteBlog = (targetId, currentLikes, targetTitle) => async (dispatch) => {
  try {
    const object = {
      likes: currentLikes + 1,
    }
    await blogService.update(targetId, object)
    dispatch({
      type: 'VOTE',
      id: targetId,
    })
    dispatch({
      type: 'SUCCESS_NOTIFICATION',
      message: `Blog '${targetTitle}' liked.`,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        content: '',
      })
    }, 5000)
  } catch (exception) {
    dispatch({
      type: 'ERROR_NOTIFICATION',
      message: `Failed to update blog. ${exception.message}`,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        content: '',
      })
    }, 5000)
  }
}

export const addBlog = (newTitle, newUrl, author) => async (dispatch) => {
  try {
    const object = {
      title: newTitle,
      url: newUrl,
      author,
    }

    const data = await blogService.create(object)
    dispatch({
      type: 'ADD',
      data,
    })
    dispatch({
      type: 'SUCCESS_NOTIFICATION',
      message: `Blog '${newTitle}' created.`,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        content: '',
      })
    }, 5000)
  } catch (exception) {
    dispatch({
      type: 'ERROR_NOTIFICATION',
      message: `Failed to create a new blog. ${exception.message}`,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        content: '',
      })
    }, 5000)
  }
}

export const blogInitialization = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  } catch (exception) {
    // Huom. En kutsu CLEAR_NOTIFICATION tarkoituksella. Kyseessä kuitenkin aika kriittinen virhe.
    dispatch({
      type: 'ERROR_NOTIFICATION',
      message: `Failed to retrieve blogs from server. ${exception.message}`,
    })
  }
}

export default blogReducer
