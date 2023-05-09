import icon from "../aus-icon.png";
import logo from "../website_logo.png";
import searchIcon from "../search-icon.png";

import { MegaMenu } from "./MegaMenu";

import Cart from "./Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMinus, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Header = ({navData}) => {

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
              <Cart />
            </div>
          </div>
        </div>
        <div className="navbar">
          <div className="container">
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                {navData.animals?navData.animals.map((animal,index)=>(
                  <MegaMenu animal={animal} key={index} />
                )):null}
                <li className="dropdown">
                  <a href="/specials" className="dropdown-toggle">
                    Specials
                  </a>
                </li>
                <li className="dropdown">
                  <a href="/brands" className="dropdown-toggle">
                    Brands
                  </a>
                  <ul className="dropdown-menu">
                    <div className="full">
                      {
                        navData.brands?navData.brands.map((brand,index)=>(
                          <a href={brand.url} key={index}><img src={brand.image} alt={brand.title} /></a>
                        )):null
                      }
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="burger-main-menu">
        
        <div className="mobile-menu">
          <div id="burger-menu" className="item">
            <div className="burger" onClick={()=>{document.querySelector("#main-menu").classList.toggle("open");document.querySelector("#main-menu").classList.toggle("close");}}>
              <FontAwesomeIcon icon={faBars} /><br/>Menu
            </div>
        
          </div>
          <div id="cart" className="item">
            <FontAwesomeIcon icon={faShoppingCart} /><br />Cart
          </div>
          <div id="account" className="item">
            <FontAwesomeIcon icon={faUser} /><br />Account
          </div>
        </div>
        <div id="main-menu" className="main-menu close ">
            <ul className="navbar-menu">
              <li className="nav-item">
                <a href="/">Home</a>
              </li>
              {
                navData.animals?navData.animals.map((animal,index)=>(
                <li className="nav-item" key={index}>
                <a className="burger-menu-toggle" data-target={animal.title} onClick={(e)=>{document.querySelector(`#${e.currentTarget.dataset.target}`).classList.toggle("hidden");e.currentTarget.lastChild.childNodes.forEach((el)=>el.classList.toggle("hidden")) }}>
                  {animal.title} <span><FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faMinus} className="hidden"/></span>
                </a>
                <ul className="navbar-menu sub-menu hidden" id={animal.title}>
                  {
                    animal.categories.map((cat,index)=>(
                      <li className="nav-item" key={index}>
                        <a className="burger-menu-toggle" data-target={`${animal.title}-${index}`} onClick={(e)=>{document.querySelector(`#${e.currentTarget.dataset.target}`).classList.toggle("hidden");;e.currentTarget.lastChild.childNodes.forEach((el)=>el.classList.toggle("hidden"))}}>{cat.title} <span><FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faMinus} className="hidden"/></span></a>
                        <ul className="navbar-menu sub-menu hidden" id={`${animal.title}-${index}`}>
                          {cat.sub_categories.map((sub_cat,index)=>(
                            <li className="nav-item" key={index}>
                              <a className="burger-menu-toggle" href={sub_cat.url}>{sub_cat.title}</a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  }
                </ul>
              </li>
              )):null}
            </ul>
          </div>
      </div>
    </header>
  );
};

export default Header;
