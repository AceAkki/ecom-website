import personal from "../assets/1.jpg";
import vehicles from "../assets/2.jpg";
import electronics from "../assets/3.jpg";
import living from "../assets/4.jpg";

const CategorySection = () => {
  return (
    <section>
      <h1>Shop By Category</h1>

      <div className="category-wrap">
        <div className="category-mini-wrapper">
          <div className="category-item landscape">
            <img src={personal} alt="" />
          </div>
          <div className="category-item portrait">Fashion</div>
          <div className="category-item portrait">Fashion</div>
        </div>
        <div className="category-mini-wrapper">
          <div className="category-item portrait">
            <img src={electronics} alt="" />
          </div>
          <div className="category-item portrait">
            <img src={living} alt="" />
          </div>
          <div className="category-item landscape">
            <img src={vehicles} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
