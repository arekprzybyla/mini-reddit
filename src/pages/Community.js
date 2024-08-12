import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Community.css";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Post from "../components/Post.js";

const Community = () => {
  const { id } = useParams();
  const idInt = parseInt(id);

  const [community, setCommunity] = useState({});

  const { communityData, setCommunityData } = useContext(AppContext);

  useEffect(() => {
    const theCommunity = communityData.find(
      (community) => community.id === idInt
    );
    setCommunity(theCommunity);
  }, [id, communityData]);

  const handleClick = (event) => {
    !isFollowing() && event.preventDefault();
  };

  const followCommunity = () => {
    const updatedCommunityData = communityData.map((community) => {
      return {
        ...community,
        following:
          community.id === idInt ? !community.following : community.following,
      };
    });
    setCommunityData(updatedCommunityData);
  };

  const isFollowing = () => {
    const community = communityData.find((community) => community.id === idInt);
    if (community.following === true) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="default-page-container">
        <div className="main-content">
          <div className="home-opening">
            <h2>{`r/${community.community}`}</h2>
            <Link
              onClick={handleClick}
              to={`/create-post/${community.community}`}
            >
              <button className={isFollowing() ? "btn-active" : "btn-inactive"}>
                <i className="ri-add-line"></i>Create
              </button>
            </Link>
          </div>
          <div className="community-posts">
            {community.posts && community.posts.length > 0 ? (
              community.posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
              <p>Community posts go here!</p>
            )}
          </div>
        </div>
      </div>
      <div className="community-profile">
        <img className="community-profile-pic" src={community.picture} alt="" />
        <h1 className="community-profile-name">{`r/${community.community}`}</h1>
        <button
          onClick={followCommunity}
          className="follow-community-btn"
          id={isFollowing() ? "communitybtn-active" : "communitybtn-inactive"}
        >
          {isFollowing() ? <i className="ri-check-line"></i> : "Follow"}
        </button>
      </div>
    </>
  );
};

export default Community;
