import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Predictsales.css'; // Import the CSS file for styling

const Predictsales = () => {
  const [file, setFile] = useState(null);
  const [monthYear, setMonthYear] = useState('');
  const [forecast, setForecast] = useState([]);
  const [totalSales, setTotalSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMonthYearChange = (e) => {
    setMonthYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !monthYear) {
      setError('Please upload a file and select a month/year.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('month_year', monthYear);

    try {
      const response = await axios.post('http://localhost:5000/Predictsales', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setForecast(response.data.forecast);
      setTotalSales(response.data.total_sales);
    } catch (error) {
      setError('Error predicting sales. Please try again.');
      console.error('Error predicting sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const plotData = forecast.map((entry) => ({
    x: entry.ds,
    y: entry.yhat,
    lower: entry.yhat_lower,
    upper: entry.yhat_upper,
  }));

  return (
    <div className="predict-sales-container">
      <h1 className="header text-4xl text-white">Sales Predictor</h1>
      <form className="form" onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label className="form-label text-white text-2xl">Upload CSV File:</label>
          <input type="file" onChange={handleFileChange} className="file-input  bg-[#041538] " />
          </div>
        <div className="form-group">
          <label className="form-label text-white text-2xl">Select Month/Year (YYYY-MM):</label>
          <input type="text" value={monthYear} onChange={handleMonthYearChange} className="form-input" />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Sales'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {totalSales && (
        <div className="results">
          <h2 className="total-sales text-white">Total Predicted Sales: {totalSales.toFixed(2)}</h2>
          <h3 className="forecast-title text-white">Forecast Details:</h3>
          <Plot
  data={[
    {
      x: plotData.map((entry) => entry.x),
      y: plotData.map((entry) => entry.y),
      type: 'scatter',
      mode: 'lines',
      name: 'Predicted Sales',
      line: { color: 'blue' },
    },
    {
      x: plotData.map((entry) => entry.x),
      y: plotData.map((entry) => entry.lower),
      type: 'scatter',
      mode: 'lines',
      name: 'Lower Bound',
      line: { color: 'red', dash: 'dash' },
    },
    {
      x: plotData.map((entry) => entry.x),
      y: plotData.map((entry) => entry.upper),
      type: 'scatter',
      mode: 'lines',
      name: 'Upper Bound',
      line: { color: 'green', dash: 'dash' },
    },
  ]}
  layout={{
    title: 'Sales Forecast',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Sales' },
    margin: { l: 50, r: 50, b: 150, t: 50 },
    width: 1000,  // Adjusted width to better fit within the container
    height: 600,
    paper_bgcolor: '#0a101e',
    plot_bgcolor: '#0a101e',
    font: {
      color: '#fff',
    },
    legend: {
      x: 1,
      y: 1,
      traceorder: 'grouped',
      font: {
        family: 'Poppins',
        size: 12,
        color: '#fff',
      },
      bgcolor: '#222',
      bordercolor: '#444',
      borderwidth: 2,
    },
    autosize: false,
  }}
  style={{ margin: '0 auto' }} // Centers the chart
/>

        </div>
      )}
    </div>
  );
};

export default Predictsales;
