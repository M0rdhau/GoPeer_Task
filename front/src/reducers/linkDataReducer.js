import linkService from '../services/linkService'
import { setNotification } from './notificationReducer'


const linkDataReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.data
    case 'NEW_LINK':
      return [...state, action.data]
    case 'DELETE_LINK':
      return state.filter(link => action.id !== link.id)
    case 'POPULATE':
      return action.data
    default:
      return state
  }
}

export const populateLinks = () => {
  return async dispatch => {
    const response = await linkService.popualteDB()
    dispatch({
      type: 'POPULATE',
      data: response.data
    })
  }
}

export const createLink = (destUrl) => {
  return async dispatch => {
    const response = await linkService.addUrl(destUrl)
    const currentLoc = window.location.href
    dispatch(setNotification(`URL added: ${currentLoc}links/${response.data.id}`, false))
    dispatch({
      type: 'NEW_LINK',
      data: response.data
    })
  }
}

export const deleteLink = (id) => {
  return async dispatch => {
    await linkService.deleteUrl(id)
    dispatch({
      type: 'DELETE_LINK',
      id
    })
  }
}

export const getGeneral = () => {
  return async dispatch => {
    const response = await linkService.getAllUrls()
    dispatch({
      type: 'INIT',
      data: response.data
    })
  }
}

export default linkDataReducer