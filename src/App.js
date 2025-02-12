import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './App.css';

const App = () => {
    
  // State variables for handling user input and exchange rates
  const [amount, setAmount] = useState(1); // Default amount
  const [fromCurrency, setFromCurrency] = useState('USD'); // Default from currency
  const [toCurrency, setToCurrency] = useState('INR'); // Default to currency
  const [exchangeRate, setExchangeRate] = useState({}); // Store exchange rates
  const [converted, setConverted] = useState(0); // Converted amount

  // Fetch exchange rates when fromCurrency changes
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        setExchangeRate(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency]);

  // Calculate converted amount whenever amount, fromCurrency, toCurrency, or exchangeRate changes
  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];
    if (conversionRate) {
      setConverted((amount * conversionRate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'fromCurrency':
        setFromCurrency(value);
        break;
      case 'toCurrency':
        setToCurrency(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className='card'>
      <img src={logo} width='60' alt='logo' />
      <h1 className='text'>Currency Converter</h1>
      <div className='exchange'>
        {/* Input field for amount */}
        <div className='input'>
          <label className='input-label'>Amount</label>
          <input
            value={amount}
            type='number'
            name='amount'
            className='input-field'
            onChange={handleChange}
          />
        </div>

        {/* Dropdown for selecting from currency */}
        <div className='input'>
          <label className='input-label'>From Currency</label>
          <select
            className='input-field'
            name='fromCurrency'
            value={fromCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for selecting to currency */}
        <div className='input'>
          <label className='input-label'>To Currency</label>
          <select
            className='input-field'
            name='toCurrency'
            value={toCurrency}
            onChange={handleChange}
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display converted amount */}
      <div className='result'>
        <h2>
          Converted Amount: <b>{converted}</b>
        </h2>
      </div>
    </div>
  );
};

export default App;