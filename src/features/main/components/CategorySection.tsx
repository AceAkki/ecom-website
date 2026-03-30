import { useState } from "react";

// image imports
import personal from "../assets/1.jpg";
import vehicles from "../assets/2.jpg";
import electronics from "../assets/3.jpg";
import living from "../assets/4.jpg";
import womenFashion from "../assets/5.jpg";
import menFashion from "../assets/6.jpg";
import { Link } from "react-router-dom";

const CategorySection = () => {
  // tracks which category is active
  let [activeID, setActiveID] = useState<number | null>(null);
  // object that store both src and string
  let categoryObj = [
    {
      name: "personal-care",
      src: personal,
    },
    {
      name: "electronics",
      src: electronics,
    },
    {
      name: "home-&-living",
      src: living,
    },
    {
      name: "mens-Fashion",
      src: menFashion,
    },
    {
      name: "womens-Fashion",
      src: womenFashion,
    },
    {
      name: "vehicles",
      src: vehicles,
    },
  ];

  let categoryElems = categoryObj.map((category, i) => {
    let imgType = i === 0 || i === 5 ? "landscape" : "portrait";
    return (
      <div
        onMouseOver={() => setActiveID(i)}
        onMouseOut={() => setActiveID(null)}
        className={`category-item ${imgType} `}
        key={category.name}
      >
        {activeID === i && (
          <Link to={`products/${category.name}`}>
            <span className="category-item-overlay">
              {category.name.replace(/-/gm, " ")}
            </span>
          </Link>
        )}

        <img src={category.src} alt="" />
      </div>
    );
  });

  return (
    <section className="category-section">
      <h1>Shop By Category</h1>
      <div className="category-wrap">{categoryElems}</div>
    </section>
  );
};

export default CategorySection;
