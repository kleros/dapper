import { constantToCamelCase } from './strings'

/**
 * Util that makes creating reducers easier.
 * @export default createReducer
 * @param {object} initialState - The initial state for the reducer.
 * @param {object} reducerMap - A map of action type string constants to functions that return a slice of state.
 * @returns {function} - A reducer function.
 */
export default function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    let newState =
      reducerMap && reducerMap[action.type]
        ? reducerMap[action.type](state, action)
        : state

    // Automatic loading plugin
    if (action.type.slice(0, 7) === 'CREATE_') {
      // Start loading
      const resource = constantToCamelCase(action.type.slice(7), {
        capitalizeFirst: true
      })
      newState = { ...newState, ['creating' + resource]: true }
    } else if (action.type.slice(0, 16) === 'RECEIVE_CREATED_') {
      // End loading
      const resource = constantToCamelCase(action.type.slice(16), {
        capitalizeFirst: true
      })
      newState = { ...newState, ['creating' + resource]: false }
    } else if (action.type.slice(0, 6) === 'FETCH_') {
      // Start loading
      const resource = constantToCamelCase(action.type.slice(6), {
        capitalizeFirst: true
      })
      newState = { ...newState, ['loading' + resource]: true }
    } else if (action.type.slice(0, 8) === 'RECEIVE_') {
      // End loading
      const resource = constantToCamelCase(action.type.slice(8), {
        capitalizeFirst: true
      })
      newState = { ...newState, ['loading' + resource]: false }
    }

    return newState
  }
}
