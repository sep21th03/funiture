'use client';
import { useState } from "react";
import Section from "@/components/elements/Section";
import ProductsData from "@/data/Products";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import { Category } from "@/data/ProductCategory";
import { Gender } from "@/data/ProductAttribute";
import { ColorAttribute } from "@/data/ProductAttribute";
import { SizeAttribute } from "@/data/ProductAttribute";


const ShopWithSidebar = () => {
    const [filterProduct, setFilterProduct] = useState(ProductsData);
    const [productShow, setProductShow] = useState(9);
    const [filterText, setFilterText] = useState('');
    const [cateToggle, setcateToggle] = useState(true);
    const [genderToggle, setgenderToggle] = useState(true);
    const [colorToggle, setcolorToggle] = useState(true);
    const [sizeToggle, setsizeToggle] = useState(true);
    const [priceRangeToggle, setpriceRangeToggle] = useState(true);

    const categoryHandler = (cateSelect) => {
        const cateFilterProduct = ProductsData.filter((data) =>(slugify(data.pCate) === cateSelect));
        setFilterProduct(cateFilterProduct)
        setFilterText(cateSelect);
    }
    const genderHandler = (genderSelect) => {
        const genderFilterProduct = ProductsData.filter(data => data.gender === genderSelect);
        setFilterProduct(genderFilterProduct)
        setFilterText(genderSelect);
    }
    const colorHandler = (colorSelect) => {
        let getColorData = ProductsData.filter((items) => {
            let colors = items.colorAttribute?.filter(color => slugify(color.color) === colorSelect)
            return colors?.length > 0;
        })
        setFilterProduct(getColorData)
        setFilterText(colorSelect);
    }
    const sizeHandler = (sizeSelect) => {
        let getSizeData = ProductsData.filter((items) => {
            let sizes = items.sizeAttribute?.filter(size => slugify(size) === sizeSelect)
            return sizes?.length > 0;
        })
        setFilterProduct(getSizeData);
        setFilterText(sizeSelect);
    }

    const priceRangeHandler = (rangeSelect) => {
        const getPriceData = ProductsData.filter(data => data.price <= rangeSelect);
        setFilterProduct(getPriceData);
        setFilterText(rangeSelect);
    }

    const ProductShowHandler = () => {
        setProductShow(productShow + 3);
    }

    const productFilterReset = () => {
        setFilterProduct(ProductsData);
        setFilterText('');
    }

    const priceRangeData = [
        50,
        100,
        200,
        300,
        400,
        500
    ]

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