import { useParams } from "react-router-dom";
import { fetchProductsData } from "../../../services/firebase";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./productpage.css";
import { useState } from "react";
import { generateRating, createStars } from "../utils";
import type { reviewType } from "../productTypes";

const ProductPage = () => {
  let [activeSec, setActiveSec] = useState<Number | null>(null);
  // using tanstack query for fetching data over loaderData
  const { productID: id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => fetchProductsData({ id: id }),
    // During this time, no new network requests will be made
    staleTime: Infinity,
    // How long the data stays in memory after the component unmounts
    gcTime: 10,
  });
  console.log(data, error, isLoading);

  const currentActiveSec = (secParam: number) => {
    setActiveSec((prev) => {
      return prev !== secParam ? secParam : null;
    });
  };

  let swiperSlides = data.images.map((imgLink: string) => {
    return (
      <SwiperSlide>
        <div className="product-images-wrap">
          <img src={imgLink} className="product-img" key={imgLink} />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <section>
      <h1 className="product-title">{data.title}</h1>
      <div className="product-content-wrap">
        <div className="product-img-wrapper">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            // breakpoints={{
            //   // when window width is >= 640px
            //   240: {
            //     slidesPerView: 1,
            //     spaceBetween: 20,
            //   },
            //   1024: {
            //     slidesPerView: 1,
            //     spaceBetween: 10,
            //   },
            // }}
          >
            {swiperSlides}
          </Swiper>
        </div>
        <div className="product-info-wrap">
          <div className="main-product-wrap">
            <p className="product-desc">{data.description}</p>
            <h2 className="product-brand">{data.brand}</h2>
            <p className="product-category">{data.category}</p>
            <h2 className="product-price">{data.price}</h2>
            <div className="product-rating">
              {createStars(generateRating(data.rating))}
            </div>
            {/* <p>Stock : {data.stock}</p> */}
            <p className="status">{data.availabilityStatus}</p>
          </div>

          <div className="tag-wrap">
            {data.tags.map((tag: string) => {
              return (
                <p className="tag" key={tag}>
                  #{tag}
                </p>
              );
            })}
          </div>

          <div className="other-product-wrap">
            <h3
              className={`section-title ${activeSec === 0 ? "active" : ""}`}
              onClick={() => currentActiveSec(0)}
            >
              Service & Support
            </h3>
            {activeSec === 0 ? (
              <div className="other-product-info">
                <strong>Warranty Information</strong>
                <p>{data.warrantyInformation}</p>
                <strong>Shipping Information</strong>
                <p>{data.shippingInformation}</p>
                <strong>Return Policy</strong>
                <p>{data.returnPolicy}</p>
              </div>
            ) : null}
          </div>

          <div className="other-product-wrap">
            <h3
              className={`section-title ${activeSec === 1 ? "active" : ""}`}
              onClick={() => currentActiveSec(1)}
            >
              Physical Specifications
            </h3>
            {activeSec === 1 ? (
              <div className="other-product-info">
                <strong>Weight :</strong>
                <p> {data.weight}</p>
                <strong>Width:</strong>
                <p> {data.dimensions.width}</p>
                <strong>Height:</strong>
                <p> {data.dimensions.height}</p>
                <strong>Depth:</strong>
                <p> {data.dimensions.depth}</p>
              </div>
            ) : null}
          </div>
          <div className="other-product-wrap">
            <h3
              className={`section-title ${activeSec === 2 ? "active" : ""}`}
              onClick={() => currentActiveSec(2)}
            >
              Reviews
            </h3>
            {activeSec === 2 ? (
              <div className="reviews-cards-wrap">
                {data.reviews.map((rev: reviewType) => {
                  return (
                    <div className="review-card">
                      <p className="review-name">{rev.reviewerName}</p>
                      <p className="review-rating">{rev.rating}/5</p>
                      <p className="review-comment">"{rev.comment}"</p>
                      <p className="review-date">
                        {new Date(rev.date).getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
