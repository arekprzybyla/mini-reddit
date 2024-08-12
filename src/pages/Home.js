import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Post from "../components/Post.js";
import { AppContext } from "../contexts/AppContext";

const Home = () => {
  const { posts } = useContext(AppContext);

  return (
    <>
      <div className="default-page-container-home">
        <div className="main-content-home">
          <div className="home-opening">
            <h2>r/general</h2>
            <Link to={`/create-post/general`}>
              <button>
                <i className="ri-add-line"></i>Create
              </button>
            </Link>
          </div>
          <div className="all-posts-section">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
