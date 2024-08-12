import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Post = ({ post }) => {
  const location = useLocation();
  const { id } = useParams();
  const idInt = parseInt(id);

  const {
    posts,
    setPosts,
    isLiked,
    removeLikedPost,
    addLikedPost,
    setCommunityData,
    communityData,
  } = useContext(AppContext);

  const liked = isLiked(post.id);

  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [isFullPost, setIsFullPost] = useState(false);

  const upVote = (event) => {
    if (post.upVote === false) {
      setUpvote(true);
      post.votes++;
      post.upVote = true;
      if (post.downVote === true) {
        setDownvote(false);
        post.votes++;
        post.downVote = false;
      }
    } else {
      setUpvote(false);
      post.votes--;
      post.upVote = false;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const downVote = (event) => {
    if (post.downVote === false) {
      setDownvote(true);
      post.votes--;
      post.downVote = true;
      if (post.upVote === true) {
        setUpvote(false);
        post.votes--;
        post.upVote = false;
      }
    } else {
      setDownvote(false);
      post.votes++;
      post.downVote = false;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleLike();
  };

  const handleLike = () => {
    if (liked) {
      removeLikedPost(post.id);
      post.liked = false;
    } else {
      addLikedPost(post);
      post.liked = true;
    }
  };

  const deletePost = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!idInt) {
      const filteredArray = posts.filter((p) => p.id !== post.id);
      setPosts(filteredArray);
    } else if (idInt) {
      const updatedCommunities = communityData.map((community) => {
        if (community.posts) {
          const updatedPosts = community.posts.filter((p) => p.id !== post.id);
          return {
            ...community,
            posts: updatedPosts,
          };
        }
        return community;
      });
      setCommunityData(updatedCommunities);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("full-post")) {
      setIsFullPost(true);
    } else {
      setIsFullPost(false);
    }
  }, [location]);

  return (
    <>
      <Link className="link" post={post} to={`/full-post/${post.id}`}>
        <div className={!isFullPost ? "post" : "full-post-post"}>
          <div className="post-section-1">
            <h3>{post.user}</h3>
            <p> - </p>
            <p>{post.date}</p>
          </div>

          <h2>{post.title}</h2>
          <p>
            {!isFullPost && post.content && post.content.length > 180
              ? post.content.substring(0, 180) + "..."
              : post.content}
          </p>
          <div className="post-section-2">
            <img
              src={post.upVote ? "/arrow1.svg" : "/arrow3.svg"}
              onClick={upVote}
              className="votes"
              alt=""
            />
            <p className="post-count">{post.votes}</p>
            <img
              src={post.downVote ? "/arrow2.svg" : "/arrow4.svg"}
              onClick={downVote}
              className="votes"
              alt=""
            />
            <img src="/comment.svg" className="comment-fav" alt="" />
            <p className="post-count">
              {post.comments && post.comments.length}
            </p>
            <img
              src={post.liked ? "/fav-filled.svg" : "/fav.svg"}
              onClick={handleButtonClick}
              className="comment-fav"
              alt=""
            />
            {post.postedByUser &&
            !location.pathname.includes("full-post" || "favourites") &&
            !liked ? (
              <div className="delete-wrapper">
                <img
                  src="/close.svg"
                  onClick={deletePost}
                  className="delete-post"
                  alt=""
                />
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
