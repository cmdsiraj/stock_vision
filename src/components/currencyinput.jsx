
import PropTypes from "prop-types";

function CurrencyInput(props) {
    return (
        <div className="flex flex-col items-center justify-center">
            <input type="text"
                   className="border border-gray-600 bg-gray-900 text-white rounded-lg px-3 py-2 mb-2 w-full sm:w-auto"
                   value={props.amount}
                   onChange={ev => props.onAmountChange(ev.target.value)} />
            <select value={props.currency}
                    className="border border-gray-600 bg-gray-900 text-white rounded-lg px-3 py-2 w-full sm:w-auto"
                    onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
            </select>
        </div>

    );
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;