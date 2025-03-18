import PriceDisplay from "@/components/widget/PriceDisplay";

const ProductPrice = ({ price }) => {
  const formatVND = (amount) => {
    return amount.toLocaleString("vi-VN") + " ₫";
  };
  return (
    <div className="product-price-variant text-start">
      {price.discount > 0 && (
        <span className="price old-price">
          <PriceDisplay price={(price.price)} />
          <span className="currency-symbol"></span>
        </span>
      )}
      <span className="price current-price">

        {price.discount > 0
          ? <PriceDisplay price={(price.price - (price.price * price.discount) / 100)} />
          : <PriceDisplay price={(price.price)} />
        }
        <span className="currency-symbol"></span>
      </span>
    </div>
  );
};

export default ProductPrice;
