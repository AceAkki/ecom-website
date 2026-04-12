import { useState, useRef, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrencyStore from "../store/currencyStore";

const useHeader = () => {
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

  const handleCurrencyChange = (e: any) => {
    console.log(e.target.value);
    selectCurrency(e.target.value);
  };

  const handleMouseOver = (numParam: number) => {
    console.log(numParam);
    setOpenSubList((prev) => {
      return prev !== numParam ? numParam : null;
    });
  };
  const handleMouseLeave = () => {
    console.log(openSubList, "list");
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
      ? `menu-dropdown`
      : `menu-dropdown hide`;
  };

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

  return {
    headerRef,
    headerWrapRef,
    isOpen,
    setIsOpen,
    openSubList,
    defaultParam,
    currentCurrency,
    currencies,
    handleCurrencyChange,
    handleMouseOver,
    handleMouseLeave,
    classUpdate,
  };
};

export default useHeader;
