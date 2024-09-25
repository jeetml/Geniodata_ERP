import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './ran.css'; // Import the CSS file
import AOS from 'aos';
import 'aos/dist/aos.css';

function Ran() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    // Delay the appearance for animation
    setTimeout(() => {
      setVisible(true);
    }, 1000); // Adjust the delay
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadPlotlyScript(); // Load the Plotly script when the component mounts
  }, []);

  const loadPlotlyScript = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:5000/predict', formData)
      .then((response) => {
        console.log(response.data); // Debug: Print the response data
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error uploading the file!', error);
      });
  };

  const getProductStats = (data) => {
    const sortedData = [...data].sort(
      (a, b) => b.performance_percentage - a.performance_percentage
    );
    return {
      best: sortedData.slice(0, 5),
      worst: sortedData.slice(-5),
      average: sortedData.slice(
        Math.floor(data.length / 2) - 2,
        Math.floor(data.length / 2) + 3
      ),
    };
  };

  const { best, worst, average } = getProductStats(data);

  return (
    <div className='per_body'>
      <div className='pre-container'>
        <h1 className='text-7xl' data-aos='fade-up'>
          Stock Performance Prediction
        </h1>
        <br /> <br />
        <p className='text-1xl' data-aos='fade-up'>
          "Upload your CSV file to gain valuable insights from your data."
        </p>
        <br /> <br />
        <input
          type='file'
          onChange={handleFileChange}
          className='file-input bg-[#041538]'
          data-aos='zoom-in'
        />
        <br />
        <button
          onClick={handleUpload}
          className='upload-button'
          data-aos='fade-right'>
          Upload and Predict
        </button>

        {data.length > 0 && (
          <Plot
            data={[
              {
                x: data.map((item) => item.model),
                y: data.map((item) => item.performance_percentage),
                type: 'scatter',
                mode: 'markers',
                marker: {
                  size: data.map(
                    (item) => item.performance_percentage / 1.5
                  ), // Adjust size for better bubble representation
                  color: data.map((item) => item.performance_percentage), // Use performance percentage for color scale
                  colorscale: 'Viridis', // Same colorscale as the image
                  showscale: true, // Show the color scale
                  opacity: 0.8,
                },
              },
            ]}
            layout={{
              title: 'Performance Percentages of Products',
              xaxis: { title: 'Model', tickangle: -45 },
              yaxis: {
                title: 'Performance Percentage (%)',
                range: [20, 110],
              },
              margin: { l: 50, r: 50, b: 150, t: 50 },
              width: 1200, // Increased width
              height: 600, // Increased height
              paper_bgcolor: '#0a101e',
              plot_bgcolor: '#0a101e',
              font: {
                color: '#fff',
              },
              bgcolor: '#222',
              legend: {
                x: 1,
                y: 1,
                traceorder: 'grouped',
                font: {
                  family: 'Poppines',
                  size: 12,
                  color: '#fff',
                },
                bgcolor: '#222',
                bordercolor: '#444',
                borderwidth: 2,
              },
            }}
            className='plotly-chart'
            data-aos='fade-up'
          />
        )}

        <div className='product-lists' data-aos='fade-up'>
          <div className='product-list'>
            <h2 className='font-semibold'>Top 5 Best Products</h2>
            <ul>
              {best.map((item, index) => (
                <li key={index}>
                  {item.model} - {item.performance_percentage.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
          <div className='product-list'>
            <h2 className='font-semibold'>Top 5 Worst Products</h2>
            <ul>
              {worst.map((item, index) => (
                <li key={index}>
                  {item.model} - {item.performance_percentage.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
          <div className='product-list'>
            <h2 className='font-semibold'>Top 5 Average Products</h2>
            <ul>
              {average.map((item, index) => (
                <li key={index}>
                  {item.model} - {item.performance_percentage.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`notification-container bg-[#101b34] divide-y rounded-md border shadow-md ${
          visible ? 'visible fade-in-up' : ''
        }`}>
        <div className='flex gap-2 px-3 py-3 items-start'>
          <div className='text-white'>
            <i
              className='ri-close-circle-fill close-button text-2xl text-white'
              onClick={handleClose}></i>
          </div>
          <div className='flex-1'>
            <h3 className='text-sm font-bold text-white'>
              Getting Error in CSV
            </h3>
            <p className='text-xs text-white'>Learn format of CSV file</p>
          </div>
          <div>
            <i className='ri-error-warning-fill w-8 h-8 rounded-full text-red'></i>
          </div>
        </div>
        <div className='flex justify-center px-5 py-3'>
          <a href='#' className='text-sm font-bold text-blue-600'>
            Send us a message
          </a>
        </div>
      </div>
    </div>
  );
}

export default Ran;
