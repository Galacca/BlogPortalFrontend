import blogService from "../services/blogService";

const blogReducer = (store = [], action) => {
      switch (action.type) {

    case "VOTE": 
      const old = store.filter(a => a.id !== action.data.id);
      const voted = store.find(a => a.id === action.data.id);
      return [...old, { ...voted, votes: voted.votes + 1 }];
    
    case "CREATE":
      return [...store, action.data]

    case "INIT_BLOGS":
    return action.data
        default: return store
      }
  };
  
export const blogInitialization = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
        })
    }
  }
  
  export const blogSort= () => {
    return async (dispatch) => {
        dispatch({
      type: 'INIT_BLOGS',
        })
    }
  }

  export default blogReducer;