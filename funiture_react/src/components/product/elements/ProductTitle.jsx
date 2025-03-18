import Link from "next/link";

const ProductTitle = ({productTitle}) => {
  const CustomTag = "h5";
  return (
    <CustomTag className="title product-title text-start">
      <Link href={`/products/${productTitle.id}`}>
        {productTitle.name}
		{productTitle.discount > 0 && 
		<span className="verified-icon">
		<i className="fas fa-badge-check" />
		</span>
		}
      </Link>
    </CustomTag>
  );
};

export default ProductTitle;
