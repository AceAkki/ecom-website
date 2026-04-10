import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useCurrencyStore from "../store/currencyStore.ts";

import * as Icon from "@phosphor-icons/react";
import "./css/header.css";

const Header = () => {
  let headerRef = useRef<HTMLHeadingElement>(null);
  let headerWrapRef = useRef<HTMLHeadingElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openSubList, setOpenSubList] = useState<number | null>(null);
  let defaultParam = "?page=1";
  console.log(openSubList);

  const { currentCurrency, currencies, selectCurrency } = useCurrencyStore(
    useShallow((state) => ({
      currentCurrency: state.currentCurrency,
      currencies: state.currencies,
      selectCurrency: state.selectCurrency,
    })),
  );

  const handleCurrencyChange = (e) => {
    console.log(e.target.value);
    selectCurrency(e.target.value);
  };

  const handleMouseOver = (numParam: number) => {
    console.log(numParam);
    setOpenSubList((prev) => {
      return prev !== numParam ? numParam : null;
    });
  };
  const handleMouseLeave = (e) => {
    console.log(openSubList, "list", e);
    setOpenSubList(null);
  };

  const classUpdate = ({
    numParam,
    mainState,
  }: {
    numParam: number;
    mainState: number | null;
  }) => {
    return numParam === mainState && mainState !== null
      ? `menu-dropdown glass-morphed`
      : `menu-dropdown hide`;
  };

  let mainCategories = {
    "personal-care": ["beauty", "fragrances", "skin-care"],
    "home-&-living": [
      "furniture",
      "groceries",
      "home-decoration",
      "kitchen-accessories",
    ],
    electronics: ["laptops", "mobile-accessories", "smartphones", "tablets"],
    vehicles: ["motorcycle", "vehicle"],
    accessories: ["sports-accessories", "sunglasses"],
    "mens-fashion": ["mens-shirts", "mens-shoes", "mens-watches"],
    "womens-fashion": [
      "tops",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  };

  let mainLists = Object.keys(mainCategories).map((key) => {
    let subCategories = mainCategories[key].map((sub) => {
      return (
        <li key={sub} className="menu-sub-category">
          <NavLink to={`/products/${sub}${defaultParam}`}>
            {sub.replace(/^(mens)-|(womens)-/gm, "")}
          </NavLink>
        </li>
      );
    });

    return [<li className="menu-sub-header">{key}</li>, subCategories].flat();
  });

  useEffect(() => {
    const nav = headerRef.current;
    const mainNav = headerWrapRef.current;
    if (!nav || !mainNav) return;
    let headerHeight = Math.floor(nav.getBoundingClientRect().height) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);

    let scrollPosition = () => {
      window.scrollY > 20
        ? mainNav.classList.add("scrolled")
        : mainNav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", scrollPosition, { passive: true });

    return function () {
      window.removeEventListener("scroll", scrollPosition);
    };
  }, []);

  return (
    <header>
      <div className="header-main-wrapper" ref={headerRef}>
        <div className="header-wrap glass-morphed-primary" ref={headerWrapRef}>
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
                <NavLink to="/" className="logo-txt">
                  ShopSphere
                </NavLink>
              </div>
            </div>
            <nav className={isOpen ? "" : "mobile-hide"}>
              <ul className="menu-options">
                <li>
                  <span
                    className="menu-dropdown-btn"
                    onMouseOver={() => handleMouseOver(0)}
                  >
                    All
                  </span>
                  <ul
                    className={classUpdate({
                      numParam: 0,
                      mainState: openSubList,
                    })}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    <li>
                      <NavLink to="/products">All Products</NavLink>
                    </li>
                    {mainLists}
                  </ul>
                </li>
                <li>
                  <span
                    className="menu-dropdown-btn"
                    onMouseOver={() => handleMouseOver(1)}
                  >
                    Essentials
                  </span>
                  <ul
                    className={classUpdate({
                      numParam: 1,
                      mainState: openSubList,
                    })}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    <li>
                      <NavLink to={`/products/Personal-Care${defaultParam}`}>
                        Personal Care
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/products/Electronics${defaultParam}`}>
                        Electronics
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/products/Home-&-Living${defaultParam}`}>
                        Living
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <span
                    className="menu-dropdown-btn"
                    onMouseOver={() => handleMouseOver(2)}
                  >
                    Fashion
                  </span>

                  <ul
                    className={classUpdate({
                      numParam: 2,
                      mainState: openSubList,
                    })}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    <li>
                      <NavLink to={`/products/Mens-Fashion${defaultParam}`}>
                        Men
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/products/Womens-Fashion${defaultParam}`}>
                        Women
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink to={`/products/Vehicles${defaultParam}`}>
                    Vehicles
                  </NavLink>
                </li>
                <li>
                  <input
                    type="text"
                    placeholder="Search for Products..."
                    className="header-input"
                  />
                </li>
              </ul>
            </nav>
            <div className="user-wrap">
              <div className="currency-wrap">
                <div>
                  <Icon.SwapIcon size={32} />
                </div>
                <select onChange={handleCurrencyChange}>
                  {currencies.map((currency) => {
                    return (
                      <option
                        key={currency.code}
                        selected={
                          currentCurrency === currency.code ? true : false
                        }
                      >
                        {currency.code}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="user-btn">
                <Icon.ShoppingCartSimpleIcon size={32} />
              </div>
              <div className="user-btn">
                <Link to="/login">
                  <Icon.UserIcon size={32} />
                </Link>
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
