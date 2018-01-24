import { constantToCamelCase } from './strings'

const automaticActionPluginMap = {
  CREATE_: { creating: true, failedCreating: false },
  RECEIVE_CREATED_: { creating: false, failedCreating: false },
  FAIL_CREATE_: { creating: false, failedCreating: true },
  FETCH_: { loading: true, failedLoading: false },
  RECEIVE_: { loading: false, failedLoading: false },
  FAIL_FETCH_: { loading: false, failedLoading: true }
}

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

    for (const typePrefix of Object.keys(automaticActionPluginMap)) {
      const typePrefixLen = typePrefix.length
      const actionTypePrefix = action.type.slice(0, typePrefixLen)
      if (typePrefix === actionTypePrefix) {
        const resource = constantToCamelCase(action.type.slice(typePrefixLen), {
          capitalizeFirst: true
        })
        const lResource = resource.toLowerCase()

        newState = {
          ...newState,
          [lResource]: {
            data:
              typePrefix === 'RECEIVE_' &&
              (!reducerMap || !reducerMap[action.type])
                ? action.payload[lResource]
                : state[lResource].data,
            ...automaticActionPluginMap[typePrefix]
          }
        }
        break
      }
    }

    return newState
  }
}
