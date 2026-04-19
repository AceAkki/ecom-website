import { useState } from "react";
import { Link } from "react-router-dom";

import { useShallow } from "zustand/react/shallow";
import useCurrencyStore from "../../../store/currencyStore";

import * as Icon from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import type { productType } from "../productTypes";

const Product = ({ data }: { data: productType }) => {
  // used for skeleton load
  let [isImageLoaded, setIsImageLoaded] = useState(false);

  const { currentMultipler, currentCurrencySymbol } = useCurrencyStore(
    useShallow((state) => ({
      currentMultipler: state.currentMultipler,
      currentCurrencySymbol: state.currentCurrencySymbol,
    })),
  );
  return (
    <div className="product-card">
      <div className="product-image">
        {!isImageLoaded && <Skeleton height="100%" />}
        <Link to={`/product/${data.id}`} className="product-link">
          <img
            src={data.thumbnail}
            alt=""
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </Link>
      </div>
      <div className="product-info">
        <h2 className="product-name">
          <Link to={`/product/${data.id}`} className="product-link">
            {data.title || <Skeleton />}
          </Link>
          <br />
          <span className="product-brand"> {data.brand} </span>
        </h2>
        <p className="product-price">
          {currentCurrencySymbol}{" "}
          {(data.price * currentMultipler).toFixed(2) || <Skeleton />}
        </p>
      </div>
      <div className="btn-wrap">
        <button className="add-cart">
          <Icon.ShoppingCartSimpleIcon />
        </button>
      </div>
    </div>
  );
};

export default Product;
