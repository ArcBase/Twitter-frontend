import {
  SET_TWEETS,
  LOADING_DATA,
  LIKE_TWEET,
  UNLIKE_TWEET,
} from "../actionTypes";
import axios from "axios";

//Get all tweets
export const getTweets = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/tweets")
    .then((res) => {
      dispatch({ type: SET_TWEETS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_TWEETS, payload: [] });
    });
};
//like tweet
export const likeTweet = (tweetId) => (dispatch) => {
  axios
    .get(`/tweet/${tweetId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_TWEET, payload: res.data });
    })
    .catch((err) => console.log(err));
};
//unlike tweet
export const unlikeTweet = (tweetId) => (dispatch) => {
  axios
    .get(`/tweet/${tweetId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_TWEET, payload: res.data });
    })
    .catch((err) => console.log(err));
};
