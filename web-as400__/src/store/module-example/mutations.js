export function setFilesMutation(state, payload) {
    state.files = payload.obj;
}

export function setUsersMutation(state, payload) {
    state.users = payload.obj;
}

export function setFilenamesMutation(state, payload) {
  state.filenames = payload.obj;
}

export function setQueriesMutation(state, payload) {
  state.queries = payload.obj;
}