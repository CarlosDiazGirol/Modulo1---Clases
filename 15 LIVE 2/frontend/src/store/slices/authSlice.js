// TODO en clase:
// - crear initialState
// - crear registerThunk
// - crear loginThunk
// - guardar token en localStorage
// - manejar loading y error

export const authReducer = (
  state = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: '',
  },
) => state;
