import * as ActionTypes from "./ActionTypes";

export const comments = (
  state = {
    errMess: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errMess: null,
        comments: action.payload
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errMess: action.payload,
        comments: []
      };

    case ActionTypes.ADD_COMMENT:
      const { comments } = state;
      const comment = { id: comments.length, ...action.payload };
      return { ...state, comments: comments.concat(comment) };

    default:
      return state;
  }
};
