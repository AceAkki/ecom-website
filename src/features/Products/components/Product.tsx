const Product = ({ data }: { data: any }) => {
  return (
    <div className="product-wrap">
      {/*
      <div className="product-image">
        <img src={data?.thumbnail} alt="" />
      </div> */}
      <div className="product-info">
        <h2>{data?.title}</h2>
        <p>{data?.price}</p>
      </div>
    </div>
  );
};

export default Product;
