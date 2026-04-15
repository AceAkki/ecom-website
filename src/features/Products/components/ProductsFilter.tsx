import type { productType } from "../productTypes";

const ProductsFilter = ({ currentData }: { currentData: productType }) => {
  return (
    <div className="product-filter-wrap">
      <div className="price-wrap">
        <label htmlFor="min">
          Min
          <input type="range" name="min" />
        </label>
        <label htmlFor="max">
          Max
          <input type="range" name="max" />
        </label>
      </div>
      <div className="rating-wrap">
        <select name="ratings"></select>
      </div>
      <div className="availabilityStatus-wrap">
        <label htmlFor="status">
          False
          <input type="radio" name="status" value="false" />
        </label>
        <label htmlFor="status">
          True
          <input type="radio" name="status" />
        </label>
      </div>
      <div className="brand-wrap">
        <select name="brands"></select>
      </div>
    </div>
  );
};

export default ProductsFilter;
