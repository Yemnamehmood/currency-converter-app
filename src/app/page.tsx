'use client'
import React, { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');

  const convertCurrency = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await response.json();
      if (data.conversion_result) {
        setResult(data.conversion_result.toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching conversion data:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Currency Converter by Yemna Mehmood</title>
      </Head>
      <div className="container">
        <h1>Currency Converter </h1>
        <div className="converter-box">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="input-field"
          />
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="dropdown">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="PKR">PKR</option>
          </select>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="dropdown">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="PKR">PKR</option>
            
          </select>
          <button onClick={convertCurrency} className="convert-btn">Convert</button>
          {result && <h2>Converted Amount: {result} {toCurrency}</h2>}
        </div>

        {/* Footer */}
        <footer>
          <p>&copy; 2024 All rights reserved Currency Converter by Yemna Mehmood</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
