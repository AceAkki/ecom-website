import * as Icon from "@phosphor-icons/react";

const Product = ({ data }: { data: any }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={data?.thumbnail} alt="" />
      </div>
      <div className="product-info">
        <h2 className="product-name">{data?.title}</h2>
        <p className="product-price">{data?.price}</p>
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
