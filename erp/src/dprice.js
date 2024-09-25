import React, { useState } from 'react';

function Dprice() {
  const [Model, setModel] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [updatedPrices, setUpdatedPrices] = useState({
    Amazon: '',
    Flipkart: '',
    VijaySales: '',
    Croma: '',
    Snapdeal: '',
  });
  const [optimalPrice, setOptimalPrice] = useState(null);

  const handleFetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${Model}`);
      if (!response.ok) {
        throw new Error('Model not found');
      }
      const data = await response.json();
      setUserData(data);
      setUpdatedPrices({
        Amazon: data.Amazon,
        Flipkart: data.Flipkart,
        VijaySales: data.VijaySales,
        Croma: data.Croma,
        Snapdeal: data.Snapdeal,
      });
      setError('');
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  const handlePriceChange = (e) => {
    setUpdatedPrices({
      ...updatedPrices,
      [e.target.name]: e.target.value,
    });
  };

  const handleGeneratePrice = async () => {
    try {
      const response = await fetch('http://localhost:5000/dprice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prices: Object.values(updatedPrices).map(Number) }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate optimal price');
      }

      const data = await response.json();
      setOptimalPrice(data.optimal_price);
      setError('');
    } catch (err) {
      setError(err.message);
      setOptimalPrice(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Fetch Model Price Info</h1>
      <div className="flex gap-4 justify-center mb-6">
        <input
          type="text"
          value={Model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Enter Model"
          className="w-3/4 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleFetchUser}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fetch Info
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

     {/* {userData && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-3xl font-bold text-white break-all">{updatedPrices.Amazon}</p>
      <p className="mt-2 text-gray-400 break-all">Amazon</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-3xl font-bold text-white break-all">{updatedPrices.Flipkart}</p>
      <p className="mt-2 text-gray-400 break-all">Flipkart</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-3xl font-bold text-white break-all">{updatedPrices.VijaySales}</p>
      <p className="mt-2 text-gray-400 break-all">VijaySales</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-3xl font-bold text-white break-all">{updatedPrices.Croma}</p>
      <p className="mt-2 text-gray-400 break-all">Croma</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-3xl font-bold text-white break-all">{updatedPrices.Snapdeal}</p>
      <p className="mt-2 text-gray-400 break-all">Snapdeal</p>
    </div>
  </div>
)} */}
{userData && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
    <div className="bg-gray-800 p-6 rounded-lg text-center min-w-[150px]">
      <p className="text-3xl font-bold text-white whitespace-nowrap">{updatedPrices.Amazon}</p>
      <p className="mt-2 text-gray-400">Amazon</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center min-w-[150px]">
      <p className="text-3xl font-bold text-white whitespace-nowrap">{updatedPrices.Flipkart}</p>
      <p className="mt-2 text-gray-400">Flipkart</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center min-w-[150px]">
      <p className="text-3xl font-bold text-white whitespace-nowrap">{updatedPrices.VijaySales}</p>
      <p className="mt-2 text-gray-400">VijaySales</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center min-w-[150px]">
      <p className="text-3xl font-bold text-white whitespace-nowrap">{updatedPrices.Croma}</p>
      <p className="mt-2 text-gray-400">Croma</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg text-center min-w-[150px]">
      <p className="text-3xl font-bold text-white whitespace-nowrap">{updatedPrices.Snapdeal}</p>
      <p className="mt-2 text-gray-400">Snapdeal</p>
    </div>
  </div>
)}



      {userData && (
        <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Update Prices</h2>
          {['Amazon', 'Flipkart', 'VijaySales', 'Croma', 'Snapdeal'].map((platform) => (
            <div key={platform} className="mb-2">
              <label className="text-gray-300">
                <strong>{platform}:</strong>
                <input
                  type="text"
                  name={platform}
                  value={updatedPrices[platform]}
                  onChange={handlePriceChange}
                  className="ml-2 p-1 border border-gray-500 rounded-lg bg-gray-700 text-white"
                />
              </label>
            </div>
          ))}
          <button
            onClick={handleGeneratePrice}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Generate Optimal Price
          </button>
          {optimalPrice && (
            <p className="mt-4 text-gray-300">
              <strong>Optimal Price:</strong> {optimalPrice}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dprice;
