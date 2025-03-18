'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import SlickSlider from "../elements/SlickSlider";
import Section from "../elements/Section";
import { slugifyTV } from "@/utils";
import {fetchCategory} from '@/services/product';
import { useEffect, useState } from 'react';



const CategoryFurniture = () => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const pageCategory = split[split.length - 1];
  const [Category, setCategory] = useState([]);
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
  }, [pageCategory]);



  return (
    <Section pClass="axil-categorie-area" sectionPadding="pt--30">
      <SlickSlider
        class="slick-layout-wrapper--15 categorie-product-two"
        slidesToShow={7}
        arrows={false}
        infinite={false}
        autoplay={true}
        responsive = {[
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
        ]}
      >
        {Category.map((data, index) => (
          <div className="categrie-product-2" key={index}>
            <Link href={`/products/category/${pageCategory}/${slugifyTV(data.name)}`}>
              <h6 className="cat-title">{data.name}</h6>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </Section>
  );
};

export default CategoryFurniture;
