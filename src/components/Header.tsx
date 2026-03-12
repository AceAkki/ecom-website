import { useState } from "react";
import { NavLink } from "react-router-dom";

import * as Icon from "@phosphor-icons/react";
import "./Header.css";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <div className="menu-main">
        <div className="menu-btn">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <Icon.ListIcon size={32} />
          </button>
        </div>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
      <nav>
        <ul className={isOpen ? "menu-options" : "hide"}>
          <li>
            <NavLink to="/products">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/products?type=new-arrivals">New Arrivals</NavLink>
          </li>
          <li>
            <NavLink to="/products?type=new-arrivals">Brands</NavLink>
          </li>
          <li>
            <input type="text" placeholder="Search for Products..." />
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
    </header>
  );
};

export default Header;
