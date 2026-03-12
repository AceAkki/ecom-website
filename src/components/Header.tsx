import { NavLink } from "react-router-dom";

import { ShoppingCartSimpleIcon, UserIcon } from "@phosphor-icons/react";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <nav>
        <ul className="menu-options">
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
          <ShoppingCartSimpleIcon size={32} />
        </div>
        <div>
          <UserIcon size={32} />
        </div>
      </div>
    </header>
  );
};

export default Header;
