import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const location = useLocation().pathname;
  const [searchValue, setSearchValue] = useState("");
  const [closed, setClosed] = useState("closed");
  const [searchDropdown, setSearchDropdown] = useState("search-off");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState("");
  const navigate = useNavigate();

  const { communityData } = useContext(AppContext);

  const dropDownMenu = () => {
    if (closed === "closed") {
      setClosed("");
    } else {
      setClosed("closed");
    }
  };

  useEffect(() => {
    setClosed("closed");
    setSearchValue("");
  }, [location]);

  const filteredData = communityData.filter((community) =>
    community.community.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleNavigate = (id) => {
    navigate(`/community/${id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const communityId = findCommunityId();
      if (communityId) {
        navigate(`/community/${communityId}`);
        setSearchDropdown("search-off");
        setSearchValue("");

        if (menuIsOpen === "menu-open") {
          setMenuIsOpen("");
          setMenuOpen(false);
        }
      }
    }
  };

  const handleMenuNavigate = () => {
    setMenuIsOpen("");
    setMenuOpen(false);
  };

  const findCommunityId = () => {
    const foundCommunity = communityData.find(
      (community) => community.community === searchValue
    );
    if (foundCommunity) return foundCommunity.id;
  };

  useEffect(() => {
    if (filteredData.length === 0) {
      setSearchDropdown("search-off");
    }
  }, [searchValue, filteredData]);

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="nav-outer">
            <Link to="/">
              <img className="logo" src="/reddit.png" alt="" />
            </Link>
          </div>
          <div className="search-container">
            <img src="/search-line.svg" className="search-svg" alt="" />
            <input
              autoComplete="off"
              value={searchValue}
              maxLength="200"
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              id="query1"
              className="query1"
              name="q"
              placeholder="Search"
              required
              onFocus={() => {
                setSearchDropdown("");
                setSearchValue("");
              }}
              onBlur={() => setSearchDropdown("search-off")}
              onKeyDown={handleKeyDown}
            />
            <ul className="search-dropdown" id={searchDropdown}>
              {filteredData.map((community) => (
                <li
                  onMouseDown={() => handleNavigate(community.id)}
                  className="search-li"
                  key={community.id}
                >
                  {community.community}
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-outer">
            <div className="dropdown-menu" id={closed}>
              <h1>user123</h1>
              <img src="/ava.png" alt="" />
              <ul>
                <li>View Profile</li>
                <li>Achievements</li>
                <li>Settings</li>
                <li>Log Out</li>
              </ul>
            </div>
            <Link to="/favourites">
              <i className="ri-hearts-line"></i>
            </Link>

            <img onClick={dropDownMenu} className="ava" src="/ava.png" alt="" />
          </div>
        </nav>
      </div>
      <div className="hidden-burger-menu" id={menuIsOpen}>
        <img src="/ava.png" alt="" className="ava2" />
        <div>
          <img src="/search-line.svg" className="search-svg2" alt="" />
          <input
            autoComplete="off"
            value={searchValue}
            maxLength="200"
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            id="query2"
            name="q"
            placeholder="Search"
            required
            className="query2"
            onFocus={() => setSearchDropdown("")}
            onBlur={() => setSearchDropdown("search-off")}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Link to="/" onClick={handleMenuNavigate}>
          <h1>Home</h1>
        </Link>
        <Link to="/favourites" onClick={handleMenuNavigate}>
          {" "}
          <h1>Favourites</h1>
        </Link>
      </div>
      <Sidebar />
      {menuOpen ? (
        <i
          className="ri-close-line"
          id="burger-menu"
          onClick={() => {
            setMenuOpen(false);
            setMenuIsOpen("");
          }}
        ></i>
      ) : (
        <i
          className="ri-menu-line"
          id="burger-menu"
          onClick={() => {
            setMenuOpen(true);
            setMenuIsOpen("menu-open");
          }}
        ></i>
      )}
    </>
  );
};

export default Navbar;
