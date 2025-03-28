import Link from "next/link";
import Image from "next/image";
import ProductDiscountLabel from "./ProductDiscountLabel";
import ActionButtons from "./ActionButtons";

const ProductThumbnail = (props) => {
  const { 
    productThumb, 
    attributeImg, 
    discountLabel, 
    hoverItems, 
    wishlistBtn, 
    cartBtn, 
    quickViewBtn, 
    isHoverThumbnail 
  } = props;
  const productImage = attributeImg 
  ? attributeImg 
  : `/${productThumb.image_path}`;
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL
  return (
    <div className="thumbnail">
      <Link href={`/products/${productThumb.id}`}>
        <Image
          src={BASE_URL + productImage}
          width={props.width ?? 300}
          height={props.height ?? 300}
          alt={productThumb.name}
        />
        {productThumb.hoverThumbnail && isHoverThumbnail && (
          <Image
            src={productThumb.hoverThumbnail}
            width={props.width ?? 300}
            height={props.height ?? 300}
            alt={productThumb.name}
            className="hover-img"
          />
        )}
      </Link>

      {productThumb.salePrice && discountLabel && (
        <ProductDiscountLabel discount={productThumb} />
      )}

      {hoverItems && (
        <div className="product-hover-action">
          <ActionButtons 
            productAction={productThumb}
            wishlistBtn={wishlistBtn}
            cartBtn={cartBtn}
            quickViewBtn={quickViewBtn}
          />
        </div>
      )}
    </div>
  );
};

export default ProductThumbnail;
