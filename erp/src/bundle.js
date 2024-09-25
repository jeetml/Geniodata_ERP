import React, { useState } from 'react';
import axios from 'axios';

const Bundle = () => {
  const [productName, setProductName] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommend = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/bundle`, {
        params: { product_name: productName, top_n: 4 }
      });
      setRecommendations(response.data.recommended_products);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Recommendations</h2>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleRecommend}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Get Recommendations
        </button>
        <ul className="mt-6 space-y-2">
          {recommendations.map((product, index) => (
            <li
              key={index}
              className="p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-300"
            >
              {product}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bundle;
