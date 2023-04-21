import React, { useEffect, useState } from "react";
import icon from "../aus-icon.png";
import logo from "../website_logo.png";
import searchIcon from "../search-icon.png";

import cartIcon from "../cart-icon.png";
import axios from "axios";
import { MegaMenu } from "./MegaMenu";
const Header = () => {
  const [navData,setNavData] = useState([])

  useEffect(()=>{
    axios.get("/navbar")
         .then(res=>setNavData(res.data))
         .catch(error=>console.log(error.response.data))
  },[])

  return (
    <header className="header">
      <div className="top">
        <div className="container">
          <strong>
            Welcome to Pet Station! Browse 1000's of awesome products for your
            furry friends!
          </strong>
        </div>
      </div>
      <div className="middle">
        <div className="container">
          <ul className="left">
            <li>
              <img
                src={icon}
                style={{
                  width: "24px",
                  height: "22px",
                  paddingRight: "5px",
                  verticalAlign: "middle",
                }}
                alt=""
              />
              <span className="bold">AUSTRALIAN FAMILY</span> BUSINESS
            </li>
          </ul>
          <div className="right">
            <ul className="start">
              <li>
                <a href="/about">ABOUT US</a>
              </li>
              <li>
                <a href="/delivery">DELIVERY</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">CONTACT</a>
              </li>
            </ul>
            <div className="end">
              <a href="/login">LOGIN / REGISTER</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="search">
          <div className="container">
            <div className="start">
              <a href="/">
                <img
                  src={logo}
                  style={{ width: "100px", marginTop: "10px" }}
                  alt=""
                />
              </a>
            </div>
            <div className="end">
              <div className="search-field">
                <form action="/" method="get" role="search" name="search">
                  <input
                    type="search"
                    className="search-input"
                    name="kw"
                    placeholder="Search for Food, Toys, Health & More..."
                  />
                  <span className="search-btn">
                    <button className="btn" type="submit" value="search">
                      <img
                        loading="lazy"
                        src={searchIcon}
                        style={{ width: "22px", verticalAlign: "middle " }}
                        alt=""
                      />
                    </button>
                  </span>
                </form>
              </div>
              <div className="cart">
                <a id="cart-btn" className="btn">
                  <img
                    src={cartIcon}
                    style={{
                      width: "43px",
                      height: "35px",
                      paddingRight: "10px",
                      verticalAlign: "middle",
                    }}
                    alt=""
                  />
                  <span>Cart</span>
                  <span className="cart-number">0</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar">
          <div className="container">
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                {navData.map((animal,index)=>(
                  <MegaMenu animal={animal} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
