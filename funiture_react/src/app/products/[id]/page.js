'use client';

import SlickSlider from "@/components/elements/SlickSlider";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayoutFour from "./SingleLayoutFour";
import ProductOne from "@/components/product/ProductOne";
import { useState } from 'react';


const ProductDetails =  ({ params }) => {
    const id = params.id;

    const [relatedProducts, setRelatedProducts] = useState([]);

    const handleRelatedProductsLoaded = (products) => {
        setRelatedProducts(products);
    };

    return (
        <>
            <SingleLayoutFour singleData={id} onRelatedProductsLoaded={handleRelatedProductsLoaded}/>
            <Section pClass="pb--50 pb_sm--30">
                <SectionTitle 
                    title="Viewed Items"
                    subtitle="Your Recently"
                    subtitleIcon="far fa-shopping-basket"
                    subColor="highlighter-primary"
                />
                <SlickSlider
                class="recent-product-activation slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
                slidesToShow={4}
                infinite={false}
                responsive = {[
                    {
                      breakpoint: 1400,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                      }
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                      }
                    },
                    {
                      breakpoint: 575,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      }
                    },
                  ]}
                >
                    {relatedProducts?.slice(0, 10).map((data) => (
                        <ProductOne product={data} key={data.id}/>
                    ))}
                </SlickSlider>
            </Section>
        </>
    );
}

export default ProductDetails;


