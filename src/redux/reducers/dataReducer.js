import {
  SET_TWEETS,
  SET_TWEET,
  LOADING_DATA,
  LIKE_TWEET,
  UNLIKE_TWEET,
} from "../actionTypes";

const initialState = {
  tweets: [],
  tweet: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.payload,
        loading: false,
      };
    case LIKE_TWEET:
    case UNLIKE_TWEET:
      let index = state.tweets.findIndex(
        (tweet) => tweet.tweetId === action.payload.tweetId,
      );
      state.tweets[index] = action.payload;
      return {
        ...state,
      };
    case SET_TWEET:
    default:
      return state;
  }
}
