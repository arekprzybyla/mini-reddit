import "./Favourites.css";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Favourites = () => {
  const {
    likedPosts,
    toggleLike,
    setAllFollowing,
    allFollowing,
    communityData,
  } = useContext(AppContext);

  useEffect(() => {
    const filteredResults = communityData.filter(
      (community) => community.following
    );
    setAllFollowing(filteredResults);
  }, []);

  return (
    <div className="default-page-container-favourites">
      <div className="main-content-favourites">
        <div className="favourites-wrapper">
          <div className="favourites-opening">
            <h2>Liked posts</h2>
            <i className="ri-heart-line"></i>
            <h2 className="hidden-h2">Following</h2>
          </div>
          <div className="fav-seperation">
            <div className="all-liked-posts">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <Post key={post.id} post={post} toggleLike={toggleLike} />
                ))
              ) : (
                <p className="alt-p">Your liked posts will appear here!</p>
              )}
            </div>
            <div className="favourites-opening" id="hidden-opening">
              <h2>Following</h2>
            </div>
            <div className="all-following" id="all-following-list">
              <div className="all-following-container">
                {allFollowing.length > 0 ? (
                  allFollowing.map((following) => (
                    <Link key={following.id} to={`/community/${following.id}`}>
                      <div className="following">
                        <img
                          className="community-pic"
                          src={following.picture}
                          alt=""
                        />
                        <h2 className="community-name">{`r/${following.community}`}</h2>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="alt-p">Your following list will appear here!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
