import {
  SET_USER,
  // SET_ERRORS,
  // CLEAR_ERRORS,
  // LOADING_UI,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_TWEET,
  UNLIKE_TWEET,
} from "../actionTypes";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_TWEET:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            tweetId: action.payload.tweetId,
          },
        ],
      };
    case UNLIKE_TWEET:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.tweetId !== action.payload.tweetId,
        ),
      };
    // case LOADING_UI:
    default:
      return state;
  }
}
