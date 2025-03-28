"use client";
import SlickSlider from "@/components/elements/SlickSlider";
import { API_ENDPOINT } from "@/services/apis";
import { fetchRelatedProduct, fetchSingleProduct } from "@/services/product";
import { useAppSelector } from "@/store/hooks";
import { addToWishlist } from "@/store/slices/productSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import Image from 'next/image';
import PriceDisplay from "@/components/widget/PriceDisplay";
const SingleLayoutFour = ({ singleData, onRelatedProductsLoaded }) => {
  const user_id = useAppSelector((state) => state.auth?.user?.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const [nav2, setNav2] = useState();
  const [quantity, setquantity] = useState(1);
  const [product, setProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  useEffect(() => {
    setNav2(slider2Ref.current);
  }, []);
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSingleProduct(singleData);
        setProduct(response.data);
        let relatedProducts = [];
        if (response.data.set_category_id) {
          const relatedResponse = await fetchRelatedProduct(
            response.data.set_category_id
          );
          console.log(response.data.set_category_id);

          relatedProducts = relatedResponse.data;
          if (onRelatedProductsLoaded) {
            onRelatedProductsLoaded(relatedProducts);
          }
        }
        if (response.data.product_hex && response.data.product_hex.length > 0) {
          setSelectedVariant(response.data.product_hex[0]);
          if (
            response.data.product_hex[0].sizes &&
            response.data.product_hex[0].sizes.length > 0
          ) {
            setSelectedSize(response.data.product_hex[0].sizes[0]);
          }
        }

        return relatedProducts;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
    if (product.product_hex && product.product_hex.length > 0) {
      setSelectedVariant(product.product_hex[0]);
      if (
        product.product_hex[0].sizes &&
        product.product_hex[0].sizes.length > 0
      ) {
        setSelectedSize(product.product_hex[0].sizes[0]);
      }
    }
  }, [singleData]);

  const isWishlistAdded = useSelector((state) =>
    state.product.wishlistItems.filter((item) => item.id === product.id)
  );

  const colorVariantHandler = (variant) => {
    setSelectedVariant(variant);
    if (variant.sizes && variant.sizes.length > 0) {
      setSelectedSize(variant.sizes[0]);
    } else {
      setSelectedSize(null);
    }
  };

  const sizeHandler = (size) => {
    setSelectedSize(size);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setquantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!user_id) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng đăng nhập để đặt hàng.",
        icon: "error",
      }).then(() => {
        router.push("/sign-in");
      });
      return;
    }

    try {
      const response = await axiosInstance.post(API_ENDPOINT.CART.ADD_CART, {
        user_id,
        product_hex_id: selectedVariant?.id,
        size_id: selectedSize?.id || null,
        quantity: quantity,
      });

      Swal.fire({
        title: response.data.status === "success" ? "Thành công!" : "Lỗi!",
        text:
          response.data.status === "success"
            ? "Sản phẩm đã được thêm vào giỏ hàng."
            : "Có lỗi xảy ra khi thêm vào giỏ hàng.",
        icon: response.data.status === "success" ? "success" : "error",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Swal.fire({
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.",
        icon: "error",
      });
    }
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: product.id,
        name: product.name,
        image:
          product.product_hex && product.product_hex.length > 0
            ? product.product_hex[0].image
            : "",
      })
    );
  };

  const getPrice = () => {
    if (!selectedSize) return 0;
    return selectedSize.price;
  };

  const getDiscountedPrice = () => {
    const price = getPrice();
    return product.discount ? price - (price * product.discount) / 100 : price;
  };

  return (
    <div className="axil-single-product-area bg-color-white">
      <div className="single-product-thumb axil-section-gap pb--20 pb_sm--0 bg-vista-white">
        <div className="container">
          <div className="row row--50">
            <div className="col-lg-6 mb--40">
              <div className="row">
                <div className="col-lg-12">
                  <SlickSlider
                    class="product-large-thumbnail-2 single-product-thumbnail axil-product slick-layout-wrapper--15 axil-slick-arrow arrow-both-side-3"
                    slidesToShow={1}
                    infinite={false}
                    draggable={false}
                    focusOnSelect={true}
                    adaptiveHeight={true}
                    asNavFor={nav2}
                    ref={slider1Ref}
                  >
                    {product.product_hex &&
                      product.product_hex.map((variant, index) => (
                        <div className="thumbnail" key={index}>
                          <Image
                            src={`${BASE_URL}/${variant.image}`}
                            height={584}
                            width={584}
                            alt={`${product.name} - ${variant.hex_code}`}
                          />
                        </div>
                      ))}
                  </SlickSlider>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb--40">
              <div className="single-product-content">
                <div className="inner">
                  <h2 className="product-title">{product.name}</h2>
                  <div className="price-wrapper">
                    <span className="price-amount">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <del className="old-price me-5">
                            <PriceDisplay price={getPrice()} />
                          </del>
                          <PriceDisplay price={getDiscountedPrice()} />
                        </>
                      ) : (
                        <PriceDisplay price={getPrice()} />
                      )}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="price-discount">
                        {product.discount}% Off
                      </span>
                    )}
                  </div>

                  <p>{product.set}</p>

                  <div className="product-variations-wrapper">
                    {product.product_hex && product.product_hex.length > 0 && (
                      <div className="product-variation">
                        <h6 className="title">Variant:</h6>
                        <div className="color-variant-wrapper flex-1">
                          <ul className="color-variant justify-content-evenly">
                            {product.product_hex.map((variant, index) => (
                              <li
                                className={`${selectedVariant &&
                                  selectedVariant.id === variant.id
                                  ? "active"
                                  : ""
                                  }`}
                                key={index}
                                onClick={() => colorVariantHandler(variant)}
                              >
                                <span>{variant.hex_code}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {selectedVariant &&
                      selectedVariant.sizes &&
                      selectedVariant.sizes.length > 0 && (
                        <div className="product-variation product-size-variation">
                          <h6 className="title">Size:</h6>
                          <ul className="range-variant">
                            {selectedVariant.sizes.map((sizeOption, index) => (
                              <li
                                key={index}
                                className={
                                  selectedSize &&
                                    selectedSize.size === sizeOption.size
                                    ? "active"
                                    : ""
                                }
                                onClick={() => sizeHandler(sizeOption)}
                              >
                                {sizeOption.size} - $
                                {sizeOption.price.toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>


                  <div className="product-action-wrapper d-flex-center">
                    <div className="pro-qty">
                      <span className="qtybtn" onClick={decrementQuantity}>
                        -
                      </span>
                      <input
                        type="number"
                        className="quantity-input"
                        value={quantity}
                        readOnly
                      />
                      <span className="qtybtn" onClick={incrementQuantity}>
                        +
                      </span>
                    </div>
                    <ul className={`${selectedSize?.stock == 0 ? "d-none" : "d-block"} product-action d-flex-center mb--0`}>
                      <li className="add-to-cart">
                        <button
                          disabled={
                            !selectedVariant ||
                            (selectedVariant.sizes &&
                              selectedVariant.sizes.length > 0 &&
                              !selectedSize)
                          }
                          onClick={handleAddToCart}
                          className="axil-btn btn-bg-primary">
                          Thêm vào giỏ hàng
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="product-desc-wrapper pt--80 pt_sm--60">
                    <h4 className="primary-color mb-3 desc-heading">
                      Mô tả
                    </h4>
                    <div className="single-desc">
                      <p>{product.set}</p>
                    </div>

                    {selectedVariant && (
                      <div className="single-desc mb--30">
                        <h5 className="title my-3">Thông tin chi tiết</h5>
                        <ul>
                          <li>Loại: {selectedVariant.hex_code}</li>
                          {selectedSize && (
                            <>
                              <li>Kích thước: {selectedSize.size}</li>
                              <li>
                                Giá: <PriceDisplay price={selectedSize.price} />
                              </li>
                              <li>Sản phẩm còn lại: <strong className="text-danger">{selectedSize.stock}</strong> sản phẩm</li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}

                    {product.discount > 0 && (
                      <div className="single-desc">
                        <h5 className="title">Special Offer</h5>
                        <p>Get {product.discount}% discount on this product!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLayoutFour;
