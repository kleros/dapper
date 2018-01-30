export const receiveAction = (type, payload) => ({
  type,
  payload
})
export const errorAction = (type, err) => ({ type, payload: err, error: true })
