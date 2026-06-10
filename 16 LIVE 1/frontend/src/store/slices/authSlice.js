const initialState = {
  user: { id: 'demo-user', email: 'student@thebridge.com', role: 'USER' },
  token: localStorage.getItem('token') || 'demo-token',
};

export default function authReducer(state = initialState) {
  return state;
}
