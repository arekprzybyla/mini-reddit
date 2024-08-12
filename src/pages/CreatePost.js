import React, { useState, useEffect, useContext } from "react";
import "./CreatePost.css";
import { AppContext } from "../contexts/AppContext";

import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titlePlaceholder, setTitlePlaceholder] = useState("Topic/Question");
  const [contentPlaceholder, setContentPlaceholder] = useState("Body/Content");

  const { directory } = useParams();

  const { setPosts, communityData, newPostId, setNewPostId } =
    useContext(AppContext);

  const submitPost = (e) => {
    setNewPostId(newPostId + 1);
    let communityPageId = "";
    e.preventDefault();
    const newPostResults = {
      id: newPostId,
      user: "user123 (you)",
      date: "just now",
      title: title,
      content: content,
      votes: 0,
      upVote: false,
      downVote: false,
      comments: [],
      liked: false,
      postedByUser: true,
    };

    if (directory == "general") {
      setPosts((prevPosts) => [...prevPosts, newPostResults]);
    } else {
      const foundCommunity = communityData.find(
        (community) => community.community === directory
      );
      communityPageId = foundCommunity.id;
      foundCommunity.posts.push(newPostResults);
    }
    const targetLocation = () => {
      if (directory === "general") {
        return "/";
      } else {
        return `/community/${communityPageId}`;
      }
    };

    navigate(targetLocation());
  };

  const handleContentFocus = () => {
    setContentPlaceholder("");
  };

  const handleContentBlur = () => {
    setContentPlaceholder("Body/Content");
  };

  const handleTitleFocus = () => {
    setTitlePlaceholder("");
  };

  const handleTitleBlur = () => {
    setTitlePlaceholder("Topic/Question");
  };

  return (
    <div className="default-page-container-create-post">
      <div className="main-content-createPost">
        <form
          className="create-post-form"
          autoComplete="off"
          onSubmit={submitPost}
        >
          <div className="create-post-opening">Create Post</div>

          <div className="create-post">
            <div className="h2-wrapper">
              <h2>Title</h2>
            </div>
            <input
              maxLength="120"
              value={title}
              type="text"
              id="create-title"
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder={titlePlaceholder}
              onFocus={handleTitleFocus}
              onBlur={handleTitleBlur}
            />
            <div className="h2-wrapper">
              <h2>Description</h2>
            </div>
            <textarea
              maxLength="600"
              value={content}
              type="text"
              id="create-description"
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder={contentPlaceholder}
              onFocus={handleContentFocus}
              onBlur={handleContentBlur}
            ></textarea>
          </div>
          <button type="submit" className="post-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
