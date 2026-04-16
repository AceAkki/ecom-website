import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// components imports start
import { StarsRatings, createStars } from "../components/StarsRatings.tsx";
import FallBackLoader from "../../../components/FallbackLoader";
// components imports end

import useCurrencyStore from "../../../store/currencyStore";
import useProductsData from "../useProductsData";

import type { reviewType } from "../productTypes";
import "./productpage.css";

const ProductPage = () => {
  let [activeSec, setActiveSec] = useState<Number | null>(null);
  // using tanstack query for fetching data over loaderData
  const { finalData, isLoading } = useProductsData();

  const { currentCurrencySymbol, currentMultipler } = useCurrencyStore(
    useShallow((state) => ({
      currentCurrencySymbol: state.currentCurrencySymbol,
      currentMultipler: state.currentMultipler,
    })),
  );

  const currentActiveSec = (secParam: number) => {
    setActiveSec((prev) => {
      return prev !== secParam ? secParam : null;
    });
  };

  let swiperSlides = finalData.images.map((imgLink: string) => {
    return (
      <SwiperSlide>
        <div className="product-images-wrap" key={imgLink}>
          <img src={imgLink} className="product-img" key={imgLink} />
        </div>
      </SwiperSlide>
    );
  });

  let currentPrice = (finalData.price * currentMultipler).toFixed(2);
  let originalPrice = (
    (finalData.price * currentMultipler) /
    (1 - finalData.discountPercentage / 100)
  ).toFixed(2);

  // fallback loader is data is not ready or isLoading
  if (isLoading || !finalData)
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );

  return (
    <section>
      <h1 className="product-title">{finalData.title}</h1>
      <div className="product-content-wrap">
        <div className="product-img-wrapper">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
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
            <p className="product-desc">{finalData.description}</p>
            <h2 className="product-brand">{finalData.brand}</h2>
            <p className="product-category">{finalData.category}</p>
            <h2 className="product-price">
              <span className="original-price">{originalPrice}</span> &nbsp;
              {currentCurrencySymbol}
              {currentPrice}
            </h2>
            <div className="product-rating">
              {createStars(StarsRatings(finalData.rating))}
            </div>
            {/* <p>Stock : {finalData.stock}</p> */}
            <p className="status">{finalData.availabilityStatus}</p>
          </div>

          <div className="tag-wrap">
            {finalData.tags.map((tag: string) => {
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
                <p>{finalData.warrantyInformation}</p>
                <strong>Shipping Information</strong>
                <p>{finalData.shippingInformation}</p>
                <strong>Return Policy</strong>
                <p>{finalData.returnPolicy}</p>
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
                <p> {finalData.weight}</p>
                <strong>Width:</strong>
                <p> {finalData.dimensions.width}</p>
                <strong>Height:</strong>
                <p> {finalData.dimensions.height}</p>
                <strong>Depth:</strong>
                <p> {finalData.dimensions.depth}</p>
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
                {finalData.reviews.map((rev: reviewType) => {
                  return (
                    <div
                      className="review-card"
                      key={rev.comment + rev.reviewerEmail}
                    >
                      <p className="review-name">{rev.reviewerName}</p>
                      <p className="review-rating">{rev.rating}/5</p>
                      <p className="review-comment">"{rev.comment}"</p>
                      <p className="review-date">
                        {new Date(rev.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
