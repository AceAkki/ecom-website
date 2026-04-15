import type { productType } from "../productTypes";

const ProductsFilter = ({ currentData }: { currentData: productType[] }) => {
  let brands = [...new Set(currentData.map((product) => product.brand))];
  let priceRange = currentData.map((product) => product.price).sort();
  console.log(priceRange);
  return (
    <div className="product-filter-wrap">
      <div className="price-wrap">
        <label htmlFor="min">
          Min
          <input type="range" name="min" min={priceRange[0]} />
        </label>
        <label htmlFor="max">
          Max
          <input type="range" name="max" max={priceRange.at(-1)} />
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
