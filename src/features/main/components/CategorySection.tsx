const CategorySection = () => {
  return (
    <section>
      <h1>Category Section</h1>

      <div className="category-wrap">
        <div className="category-mini-wrapper">
          <div className="category-item landscape">Personal</div>
          <div className="category-item portrait">Fashion</div>
          <div className="category-item portrait">Fashion</div>
        </div>
        <div className="category-mini-wrapper">
          <div className="category-item portrait">Electronics</div>
          <div className="category-item portrait">Living</div>
          <div className="category-item landscape">Vehicles</div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
