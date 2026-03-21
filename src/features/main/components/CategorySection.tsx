import personal from "../assets/1.jpg";
import vehicles from "../assets/2.jpg";

const CategorySection = () => {
  return (
    <section>
      <h1>Category Section</h1>

      <div className="category-wrap">
        <div className="category-mini-wrapper">
          <div className="category-item landscape">
            <img src={personal} alt="" />
          </div>
          <div className="category-item portrait">Fashion</div>
          <div className="category-item portrait">Fashion</div>
        </div>
        <div className="category-mini-wrapper">
          <div className="category-item portrait">Electronics</div>
          <div className="category-item portrait">Living</div>
          <div className="category-item landscape">
            <img src={vehicles} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
