import Link from "next/link";

const ProductTitle = ({ productTitle }) => {
  const CustomTag = "h5";
  return (
    <CustomTag className="title product-title text-start">
      <Link href={`/products/${productTitle.id}`}><span className="ctf-product-title">{productTitle.name}</span></Link>
    </CustomTag>
  );
};

export default ProductTitle;
