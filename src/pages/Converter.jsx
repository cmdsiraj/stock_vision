import React from "react";
import CurrencyInput from "../components/CurrencyInput"
import {useState, useEffect} from "react";
import axios from "axios";
import banner from "../images/currency1.jpg"
import Navbar from "../components/Navbar";

function Converter() {
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');
    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios.get('https://api.apilayer.com/fixer/latest?base=USD&apikey=iP72mHtyOnMeZ6ob47LE08NBLlUjlQMz')
            .then(response => {
                setRates(response.data.rates);
            })
    }, []);

    function handleAmount1Change(amount1){
        setAmount2(amount1*rates[currency2]/rates[currency1]);
        setAmount1(amount1);
    }
    function handleAmount2Change(amount2){
        setAmount1(amount2*rates[currency1]/rates[currency2]);
        setAmount2(amount2);
    }
    function currency1Change(currency1){
        setAmount2(amount1*rates[currency2]/rates[currency1]);
        setCurrency1(currency1);
    }
    function currency2Change(currency2){
        setAmount1(amount2*rates[currency1]/rates[currency2]);
        setCurrency2(currency2);
    }
    return (
<div>
    <Navbar/>
        <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
            <div className="absolute w-full h-full">
                <img
                    className="w-full h-full object-fill filter"
                    src={banner}
                    alt="Background"
                />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-slate-600 rounded-lg shadow-md p-6 flex flex-col items-center justify-center backdrop-filter backdrop-blur-lg opacity-90">
                <h1 className="text-white font-light text-3xl md:text-3xl lg:text-3xl mb-8">Currency Converter</h1>
                <CurrencyInput
                    onAmountChange={handleAmount1Change}
                    onCurrencyChange={currency1Change}
                    currencies={Object.keys(rates)}
                    amount={amount1}
                    currency={currency1}
                />
                <div className="w-full h-px my-4 bg-gray-300"></div>

                <CurrencyInput
                    onAmountChange={handleAmount2Change}
                    onCurrencyChange={currency2Change}
                    currencies={Object.keys(rates)}
                    amount={amount2}
                    currency={currency2}
                />
            </div>

        </div>
        </div>
    );
}
export default Converter;
