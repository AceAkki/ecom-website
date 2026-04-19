import useproductsStore from "../../../store/productsStore";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import * as Icon from "@phosphor-icons/react";
import "./productsFilter.css";
import { useShallow } from "zustand/shallow";

const ProductsFilter = () => {
  const { productsData, filters, updateFilters } = useproductsStore(
    useShallow((state) => ({
      productsData: state.productsData,
      filters: state.filters,
      updateFilters: state.updateFilters,
    })),
  );
  let brands = [
    "All",
    ...new Set(productsData.map((product) => product.brand)),
  ];
  let priceRange = productsData
    .map((product) => product.price)
    .sort((a, b) => a - b);
  let lastPrice = priceRange.at(-1);
  let minPrice = priceRange[0] || 0;
  let maxPrice = lastPrice ? priceRange[0] + lastPrice : 0;
  // let middle = maxPrice / 2;

  return (
    <div className="product-filter-wrap">
      <div className="filter-wrap">
        <h5 className="filter-title"> Price Range</h5>
        <label htmlFor="min">
          <div className="price-input-wrap">
            {/*
            <input type="range" name="min" min={minPrice} max={middle} />
            <input type="range" name="max" min={middle} max={maxPrice} />
            */}
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
    </div>
  );
};

export default ProductsFilter;
