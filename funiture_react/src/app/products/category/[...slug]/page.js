"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import ProductOne from "@/components/product/ProductOne";
import { unSlugifyTVName, unSlugifyTV } from "@/utils";
import { fetchCategory, fetchProductByCategory } from "@/services/product";
import Preloader from "@/components/preloader/Preloader";

const CategoryProduct = ({ params }) => {
  const catParam = params.slug[params.slug.length - 1];
  const [Category, setCategory] = useState([]);
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategory();
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (Category.length > 0) {
      const selectedCategory = unSlugifyTV(catParam, Category);
      const fetchProduct = async () => {
        try {
          const response = await fetchProductByCategory(selectedCategory);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProduct();
    }
  }, [catParam, Category]);
  return (
    <>
    <Preloader />
      <Breadcrumb
        activeItem="Category"
        title={unSlugifyTVName(catParam, Category)}
      />
      <Section pClass="axil-shop-area" sectionPadding="axil-section-gapcommon">
        <div className="row row--15">
          {Product.length > 0 ? (
            Product?.map((data) => (
              <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                <ProductOne product={data} />
              </div>
            ))
          ) : (
            <h2 className="text-center">No Category Products Found</h2>
          )}
        </div>
      </Section>
    </>
  );
};

export default CategoryProduct;
