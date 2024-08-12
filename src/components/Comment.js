import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Comment = ({ comment }, idInt) => {
  const { posts, setPosts, communityData, setCommunityData, communityNameId } =
    useContext(AppContext);

  const removeItemFromCommunity = () => {
    return communityData.map((community) => ({
      ...community,
      posts: community.posts.map((post) => ({
        ...post,
        comments: post.comments.filter((c) => c.id !== comment.id),
      })),
    }));
  };

  const removeItemFromPosts = () => {
    return posts.map((post) => ({
      ...post,

      comments: post.comments.filter((c) => c.id !== comment.id),
    }));
  };

  const handleRemove = () => {
    if (communityNameId) {
      console.log(communityNameId);
      const updatedData = removeItemFromCommunity();
      setCommunityData(updatedData);
    } else {
      console.log("data");
      const updatedData = removeItemFromPosts();
      setPosts(updatedData);
    }
  };

  return (
    <div className="each-comment">
      <div>
        <div>
          <img
            src={
              comment.user === "user123 (you)" ? "/ava.png" : "/fake-user2.png"
            }
            alt=""
            className="user-ava"
          />
          <h2>{comment.user}</h2>
        </div>
        <p> - </p>
        <p>{comment.date}</p>
        {comment.user === "user123 (you)" && (
          <div className="delete-wrapper">
            <img
              src="/close.svg"
              onClick={handleRemove}
              className="delete-post"
              alt=""
            />
          </div>
        )}
      </div>

      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;
