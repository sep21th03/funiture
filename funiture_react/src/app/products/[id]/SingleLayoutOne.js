'use client';
import { useState } from "react";
import Image from "next/image";

const SingleLayoutOne = () => {
    const [quantity, setQuantity] = useState(1);

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    return ( 
        <div className="axil-single-product-area bg-color-white">
            <div className="single-product-thumb axil-section-gap pb--20 pb_sm--0 bg-vista-white">
                <div className="container">
                    <div className="row row--25">
                        <div className="col-lg-6 mb--40">
                            <div className="h-100">
                                <div className="position-sticky sticky-top">
                                    <div className="row row--10">
                                        <div className="single-product-thumbnail axil-product thumbnail-grid">
                                            <div className="thumbnail">
                                                <Image
                                                    width={595}
                                                    height={595}
                                                    alt="Thumbnail"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb--40">
                            <div className="h-100">
                                <div className="position-sticky sticky-top">
                                    <div className="single-product-content">
                                        <div className="inner">
                                            <h2 className="product-title">Product Title</h2>
                                            <span className="price-amount">$0.00</span>
                                            <div className="product-action-wrapper d-flex-center">
                                                <div className="pro-qty">
                                                    <span className="qtybtn" onClick={decrementQuantity}>-</span>
                                                    <input type="number" className="quantity-input" value={quantity} readOnly />
                                                    <span className="qtybtn" onClick={incrementQuantity}>+</span>
                                                </div>
                                                <ul className="product-action d-flex-center mb--0">
                                                    <li className="add-to-cart">
                                                        <button className="axil-btn btn-bg-primary">Add to Cart</button>
                                                    </li>
                                                    <li className="wishlist">
                                                        <button className="axil-btn wishlist-btn">
                                                            <i className="far fa-heart" />
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="product-desc-wrapper pt--80 pt_sm--60">
                                                <h4 className="primary-color mb--40 desc-heading">Description</h4>
                                                <p>Product description goes here.</p>
                                            </div>
                                        </div>
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
 
export default SingleLayoutOne;
