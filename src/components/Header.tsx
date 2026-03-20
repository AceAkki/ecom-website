import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import * as Icon from "@phosphor-icons/react";
import "./Header.css";
const Header = () => {
  let headerRef = useRef<HTMLHeadingElement>(null);
  let headerWrapRef = useRef<HTMLHeadingElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const nav = headerRef.current;
    const mainNav = headerWrapRef.current;
    if (!nav || !mainNav) return;
    let headerHeight = Math.floor(nav.getBoundingClientRect().height) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);

    window.addEventListener("scroll", () => {
      console.log(window.scrollY, window.scrollY > 20);
      if (window.scrollY > 20) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    });
  }, []);

  return (
    <header>
      <div className="header-main-wrapper" ref={headerRef}>
        <div className="header-wrap glass-morphed" ref={headerWrapRef}>
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
          </div>
          <div className="search-wrap desktop-hide">
            <input type="text" placeholder="Search for Products..." />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
