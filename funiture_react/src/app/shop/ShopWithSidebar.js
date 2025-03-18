"use client";
import { useState, useEffect } from "react";
import Section from "@/components/elements/Section";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import { fetchProductData, fetchCategory } from "@/services/product";

const ShopWithSidebar = () => {
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryShow, setCategoryShow] = useState([]);
  const [productShow, setProductShow] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [cateToggle, setCateToggle] = useState(true);
  const [priceRangeToggle, setPriceRangeToggle] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductData();
        setProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();

    const fetchCtData = async () => {
      try {
        const response = await fetchCategory();
        setCategoryShow(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCtData();
  }, []);

  useEffect(() => {
    let filtered = Products;

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        slugify(product.set_category_name).includes(selectedCategory)
      );
    }

    if (selectedPrice !== null) {
      filtered = filtered.filter((product) => product.price <= selectedPrice);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedPrice, Products]);

  const categoryHandler = (cateSelect) => {
    setSelectedCategory(cateSelect);
  };

  const priceRangeHandler = (rangeSelect) => {
    setSelectedPrice(rangeSelect);
  };

  const ProductShowHandler = () => {
    setProductShow(productShow + 3);
  };

  const productFilterReset = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setFilteredProducts(Products);
  };

  const priceRangeData = [100000, 1000000, 10000000, 100000000];

    return ( 
        <Section pClass="axil-shop-area">
            <div className="row">
           
                <div className="col-lg-12">
                    <div className="row row--15">
                        {filterProduct.length > 0 ? filterProduct.slice(0, productShow).map((data) => (
                            <div className="col-xl-4 col-sm-6" key={data.id}>
                                <ProductOne product={data} pClass="mb--30" />
                            </div>
                        )) : <h4 className="text-center pt--30">No Product Found</h4>}
                    </div>
                    <div className="text-center pt--20">
                        <button className={`axil-btn btn-bg-lighter btn-load-more ${filterProduct.length < productShow ? "disabled" : ""}`} onClick={ProductShowHandler}>{filterProduct.length < productShow ? "No More Data" : "Load more"}</button>
                    </div>
                </div>
            </div>

        </Section>
    );
}
 
export default ShopWithSidebar;
