import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import disputes from './disputes'

export default combineReducers({
  router,
  form,
  disputes
})
