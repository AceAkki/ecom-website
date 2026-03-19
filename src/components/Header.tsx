import { useState } from "react";
import { NavLink } from "react-router-dom";

import * as Icon from "@phosphor-icons/react";
import "./Header.css";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <div className="header-main-wrapper">
        <div className="header-wrap">
          <div className="main-header">
            <div className="menu-main">
              <div className="menu-btn">
                <button
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 4000);
                  }}
                >
                  <Icon.ListIcon size={32} />
                </button>
              </div>
              <div>
                <NavLink to="/">Home</NavLink>
              </div>
            </div>
            <nav className={isOpen ? "" : "mobile-hide"}>
              <ul className="menu-options">
                <li>
                  <NavLink to="/products">All</NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">
                    Personal Care
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">
                    Men's Fashion
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">
                    Women's Fashion
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">
                    Electronics
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">
                    Home & Living
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products?type=new-arrivals">Vehicles</NavLink>
                </li>
              </ul>
            </nav>
            <div className="user-wrap">
              <div>
                <Icon.ShoppingCartSimpleIcon size={32} />
              </div>
              <div>
                <Icon.UserIcon size={32} />
              </div>
            </div>
          </div>
          <div className="search-wrap">
            <input type="text" placeholder="Search for Products..." />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
