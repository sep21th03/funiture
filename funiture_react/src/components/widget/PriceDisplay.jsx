import CurrencyFormat from "react-currency-format";

const PriceDisplay = ({ price }) => {
    return <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} suffix={' VNĐ'} />
};

export default PriceDisplay;
