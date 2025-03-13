const ProductPrice = ({ price }) => {
  const formatVND = (amount) => {
    return amount.toLocaleString("vi-VN") + " ₫";
  };
  return (
    <div className="product-price-variant">
      {price.discount > 0 && (
        <span className="price old-price">
          {formatVND(price.price)}
          <span className="currency-symbol"></span>
        </span>
      )}
      <span className="price current-price">
        {price.discount > 0
          ? formatVND(price.price - (price.price * price.discount) / 100)
          : formatVND(price.price)}
        <span className="currency-symbol"></span>
      </span>
    </div>
  );
};

export default ProductPrice;
