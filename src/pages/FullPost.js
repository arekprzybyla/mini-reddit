import React, { useEffect, useContext, useState } from "react";
import "./FullPost.css";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Post from "../components/Post.js";
import Comment from "../components/Comment.js";

const FullPost = () => {
  const { id } = useParams();
  const idInt = parseInt(id);
  const [selectedPost, setSelectedPost] = useState({});
  const {
    posts,
    communityData,
    setCommunityNameId,
    communityNameId,
    newCommentId,
    setNewCommentId,
  } = useContext(AppContext);

  const [placeholder, setPlaceholder] = useState("add comment here");
  const [content, setContent] = useState("");

  //find selectedPost
  useEffect(() => {
    const findPostInGeneral = posts.find((post) => post.id === idInt);
    communityData.map((community) => {
      community.posts.map((post) => {
        if (post.id === idInt) {
          setSelectedPost(post);
          setCommunityNameId(community.id);
        }
      });
    });
    if (findPostInGeneral) {
      setSelectedPost(findPostInGeneral);
      setCommunityNameId("");
    }
  }, [communityData, posts]);

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    setPlaceholder("add comment here");
  };

  const submitComment = (e) => {
    setNewCommentId(newCommentId + 1);
    e.preventDefault();
    const newComment = {
      id: newCommentId,
      user: "user123 (you)",
      date: "just now",
      comment: content,
      postedByUser: true,
    };

    posts.forEach((post) => {
      if (post.id === idInt) {
        post.comments.push(newComment);
      }
    });
    communityData.forEach((community) => {
      if (community.id === communityNameId) {
        community.posts.forEach((post) => {
          if (post.id === idInt) {
            post.comments.push(newComment);
          }
        });
      }
    });

    setContent("");
  };

  return (
    <div className="default-page-container-home">
      <div className="main-content-home">
        <div className="full-post-opening">
          <h2>Full post</h2>
        </div>
        <Post post={selectedPost} />
        <div className="comments-opening">
          <h2>Comments</h2>
        </div>
        {selectedPost.comments && selectedPost.comments.length > 0 ? (
          selectedPost.comments.map((comment) => (
            <Comment idInt={idInt} key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="if-no-comments">Post comments go here!</p>
        )}
        <hr className="full-post-line" />
        <form
          autoComplete="off"
          onSubmit={submitComment}
          className="comment-form"
        >
          <div>
            <img src="/ava.png" alt="" className="user-ava" />

            <h2>user123 (you) </h2>
          </div>
          <input
            value={content}
            maxLength="300"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            onChange={(e) => setContent(e.target.value)}
            required
            id="test1"
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default FullPost;
