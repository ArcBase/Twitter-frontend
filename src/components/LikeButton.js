import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

//REDUX
import { connect } from "react-redux";
import { likeTweet, unlikeTweet } from "../redux/actions/dataActions";

class LikeButton extends Component {
  likedTweet = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.tweetId === this.props.tweetId)
    )
      return true;
    else return false;
  };
  likeTweet = () => {
    this.props.likeTweet(this.props.tweetId);
  };
  unlikeTweet = () => {
    this.props.unlikeTweet(this.props.tweetId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <span>
          <FavoriteBorderIcon
            style={{ color: "lightgray", cursor: "pointer" }}
            fontSize='small'
          />
        </span>
      </Link>
    ) : this.likedTweet() ? (
      <span onClick={this.unlikeTweet}>
        <FavoriteIcon
          style={{ color: "red", cursor: "pointer" }}
          fontSize='small'
        />
      </span>
    ) : (
      <span onClick={this.likeTweet}>
        <FavoriteBorderIcon
          style={{ color: "lightgray", cursor: "pointer" }}
          fontSize='small'
        />
      </span>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  likeTweet: PropTypes.func.isRequired,
  unlikeTweet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeTweet,
  unlikeTweet,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
