import useproductsStore from "../../../store/productsStore";
import { useShallow } from "zustand/shallow";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import * as Icon from "@phosphor-icons/react";
import "./productsFilter.css";
import type { productType } from "../productTypes";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const panelVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.99, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.55, 0.06, 0.68, 0.19] },
  },
} as const;

const ProductsFilter = ({ finalData }: { finalData: productType[] }) => {
  const { filters, updateFilters } = useproductsStore(
    useShallow((state) => ({
      filters: state.filters,
      updateFilters: state.updateFilters,
    })),
  );
  let [isShown, setIsShown] = useState(false);
  // let filterToggleRef = useRef(null);
  let brands = ["All", ...new Set(finalData.map((product) => product.brand))];
  let priceRange = finalData
    .map((product) => product.price)
    .sort((a, b) => a - b);
  let minPrice = priceRange[0] || 0;
  let maxPrice = priceRange.at(-1) || 0;

  return (
    <motion.div
      className="product-filter-wrap"
      animate={{
        opacity: [0, 1],
        y: [-50, 0],
        // Will be used when gesture starts
        transition: { duration: 0.8 },
        transitionEnd: { scale: 1, opacity: 1 },
      }}
    >
      <div className="filter-head-wrap">
        <h5 className="filter-main-title"> Filters</h5>
        <button className="filter-toggle" onClick={() => setIsShown(!isShown)}>
          <Icon.FadersIcon />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isShown && (
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="filter-wrap">
              <h5 className="filter-title"> Price Range</h5>
              <label htmlFor="min">
                <div className="price-input-wrap">
                  <RangeSlider
                    value={filters.priceRange}
                    min={minPrice}
                    max={maxPrice}
                    onInput={(val: [number, number]) =>
                      updateFilters({ priceRange: val })
                    }
                  />
                </div>
              </label>
            </div>
            <hr className="filter-divider" />
            <div className="filter-wrap">
              <h5 className="filter-title"> Ratings</h5>
              <div className="ratings-wrapper">
                {Array(...Array(5))
                  .map((_, i) => i + 1)
                  .sort((a, b) => b - a)
                  .map((el) => {
                    return (
                      <button
                        className="rating-btn"
                        key={el}
                        onClick={() => updateFilters({ rating: el })}
                      >
                        <input
                          type="checkbox"
                          checked={filters.rating === el}
                          readOnly
                        />
                        <Icon.StarIcon weight="fill" size={32} /> {el} & Up
                      </button>
                    );
                  })}
              </div>
            </div>
            <hr className="filter-divider" />
            <div className="filter-wrap">
              <h5 className="filter-title"> Availability</h5>
              <label htmlFor="status" className="status-wrap">
                <input
                  type="checkbox"
                  name="status"
                  onChange={() =>
                    updateFilters({ inStockOnly: !filters.inStockOnly })
                  }
                />
                <p>Stock Availability Status</p>
              </label>
            </div>
            <hr className="filter-divider" />
            <div className="filter-wrap">
              <h5 className="filter-title"> Brands</h5>
              <select
                name="brands"
                value={filters.brand}
                onChange={(e) => {
                  updateFilters({ brand: e.target.value });
                }}
              >
                {brands.map((brand) => {
                  return (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  );
                })}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductsFilter;
