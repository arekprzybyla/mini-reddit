import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext.js";

const Sidebar = () => {
  const { communitiesSampleData } = useContext(AppContext);
  return (
    <div className="sidebar-container">
      <h2 className="community-title">COMMUNITIES</h2>
      {communitiesSampleData.map((community) => (
        <div key={community.id}>
          <Link to={`/community/${community.id}`}>
            <div className="community">
              <img className="community-pic" src={community.picture} alt="" />
              <h2 className="community-name">{`r/${community.community}`}</h2>
            </div>
          </Link>
        </div>
      ))}
      <div className="sidebar-other">
        <h2 className="community-title">OUR PARTNERS</h2>
        <div className="sidebar-other-content">
          <img src="/partner2.png" className="partner-pic" alt="" />
          <img src="/partner4.png" className="partner-pic" alt="" />
        </div>
      </div>
      <div className="footer-div">
        <img className="logo-footer" src="/reddit.png" alt="" />
        <div className="footer-rights">
          <p className="rights-p">© 2024 miniReddit. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
