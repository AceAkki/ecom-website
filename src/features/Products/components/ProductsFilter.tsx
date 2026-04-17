import type { productType } from "../productTypes";
import { useState } from "react";
import * as Icon from "@phosphor-icons/react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./productsFilter.css";

const ProductsFilter = ({ currentData }: { currentData: productType[] }) => {
  const [value, setValue] = useState<[number, number]>([30, 60]);
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  let brands = [...new Set(currentData.map((product) => product.brand))];
  let priceRange = currentData
    .map((product) => product.price)
    .sort((a, b) => a - b);
  let lastPrice = priceRange.at(-1);
  let minPrice = priceRange[0];
  let maxPrice = lastPrice ? priceRange[0] + lastPrice : 0;
  // let middle = maxPrice / 2;
  console.log(value);

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
              value={value}
              min={minPrice}
              max={maxPrice}
              onInput={setValue}
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
                  onClick={() => setCurrentRating(el)}
                >
                  <input
                    type="checkbox"
                    name={`${el}`}
                    checked={currentRating === el ? true : false}
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
          <input type="checkbox" name="status" />
          <p>Stock Availability Status</p>
        </label>
      </div>
      <hr className="filter-divider" />
      <div className="filter-wrap">
        <h5 className="filter-title"> Brands</h5>
        <select name="brands">
          {brands.map((brand) => {
            return (
              <option key={brand} value="brand">
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
