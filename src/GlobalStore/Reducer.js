const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...state,
        islogged: false,
      };
    case "USER-INFO":
      return {
        ...state,
        user: { ...state.user , ...action.payload },
      };
    case "USER-INFO-EDITOR":
      let user = state.user;
      return {
        ...state,
        user: { ...user, ...action.payload },
      };
    case "CHANGE-TAB":
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;
