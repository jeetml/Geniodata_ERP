import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './per.css';  // Import the CSS file
import AOS from 'aos';
import 'aos/dist/aos.css';

function Per() {
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
    // Delay the appearance to allow for the "disappear" effect
    setTimeout(() => {
      setVisible(true);
    }, 1000); // Adjust the delay as needed
  }, []);

  const handleClose = () => {
    setVisible(false);
  };
    useEffect(() => {
        loadPlotlyScript();  // Load the Plotly script when the component mounts
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

        axios.post('http://localhost:5000/predict', formData)
            .then(response => {
                console.log(response.data);  // Debug: Print the response data
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error uploading the file!', error);
            });
    };

    const getProductStats = (data) => {
        const sortedData = [...data].sort((a, b) => b.performance_percentage - a.performance_percentage);
        return {
            best: sortedData.slice(0, 5),
            worst: sortedData.slice(-5),
            average: sortedData.slice(Math.floor(data.length / 2) - 2, Math.floor(data.length / 2) + 3),
        };
    };

    const { best, worst, average } = getProductStats(data);

    return (
        <div className='per_body'>
        <div className="pre-container">
            <h1 className="text-7xl" data-aos="fade-up">Stock Performance Prediction</h1>
            <br /> <br />
            <p className='text-1xl' data-aos="fade-up">"Upload your CSV file to gain valuable insights from your data."</p>
            <br /> <br />
            <input type="file" onChange={handleFileChange} className="file-input  bg-[#041538] "  data-aos='zoom-in'/>
            
    {/* <label for="file-upload" class="w-64 flex flex-col items-center px-4 py-6 bg-[#041538] text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-500">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span id="file-name" class="mt-2 text-base leading-normal">Select a file</span>
        <input id="file-upload" type="file" class="hidden" />
    </label> */}
    <br></br>
            <button onClick={handleUpload} className="upload-button" data-aos='fade-right's>Upload and Predict</button>

            {data.length > 0 && (
                <Plot
                    data={[
                        {
                            x: data.map(item => item.model),
                            y: data.map(item => item.performance_percentage),
                            type: 'scatter',
                            mode: 'markers',
                            marker: { 
                                size: data.map(item => item.performance_percentage / 1.5),  // Adjust size for better bubble representation
                                color: data.map(item => item.performance_percentage),  // Use performance percentage for color scale
                                colorscale: 'Viridis',  // Same colorscale as the image
                                showscale: true,  // Show the color scale
                                opacity: 0.8,
                            },
                        },
                    ]}
                    layout={{ 
                        title: 'Performance Percentages of Products',
                        xaxis: { title: 'Model', tickangle: -45 }, 
                        yaxis: { title: 'Performance Percentage (%)', range: [20, 110] },
                        margin: { l: 50, r: 50, b: 150, t: 50 },
                        width: 1200,  // Increased width
                        height: 600,  // Increased height
                        paper_bgcolor: '#0a101e',
                        plot_bgcolor: '#0a101e',
                        font:{
                            color:'#fff'
                        },
                        bgcolor:'#222',
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
                                }

                    }}
                    className="plotly-chart"
                     data-aos='fade-up'
                    // layout={{
                    //     title: 'Performance Percentages of Products',
                    //     xaxis: { title: 'Model', tickangle: -45 }, 
                    //     yaxis: { title: 'Performance Percentage (%)', range: [20, 110] },
                    //     margin: { l: 50, r: 50, b: 150, t: 50 },
                    //     width: 1200,  // Increased width
                    //     height: 600,  // Increased height
                    //     paper_bgcolor: '#222',  // Set background color to dark
                    //     plot_bgcolor: '#222',   // Set plot area background to dark
                    //     font: {
                    //         color: '#fff',  // Set font color to white
                    //     },
                    //     hovermode: 'closest',
                    //     legend: {
                    //         x: 1,
                    //         y: 1,
                    //         traceorder: 'normal',
                    //         font: {
                    //             family: 'sans-serif',
                    //             size: 12,
                    //             color: '#fff',
                    //         },
                    //         bgcolor: '#222',
                    //         bordercolor: '#444',
                    //         borderwidth: 2,
                    //     }
                    // }} 
                />
            )}

            <div className="product-lists" data-aos="fade-up">
                <div className="product-list">
                    <h2 className='font-semibold'>Top 5 Best Products</h2>
                    <ul>
                        {best.map((item, index) => (
                            <li key={index}>{item.model} - {item.performance_percentage.toFixed(2)}%</li>
                        ))}
                    </ul>
                </div>
                <div className="product-list">
                    <h2 className='font-semibold'>Top 5 Worst Products</h2>
                    <ul>
                        {worst.map((item, index) => (
                            <li key={index}>{item.model} - {item.performance_percentage.toFixed(2)}%</li>
                        ))}
                    </ul>
                </div>
                <div className="product-list">
                    <h2 className='font-semibold'>Top 5 Average Products</h2>
                    <ul>
                        {average.map((item, index) => (
                            <li key={index}>{item.model} - {item.performance_percentage.toFixed(2)}%</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <div
      className={`notification-container bg-[#101b34] divide-y rounded-md border shadow-md ${visible ? "visible fade-in-up" : ""}`}
    >
      <div className="flex gap-2 px-3 py-3 items-start">
        <div className='text-white'>
        <i className="ri-close-circle-fill close-button text-2xl text-white" onClick={handleClose}></i>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Getting Error in CSV</h3>
          <p className="text-xs text-white">Learn formate  of CSV file</p>
        </div>
        <div>
        <i class="ri-error-warning-fill w-8 h-8 rounded-full text-red"></i>
        </div>
      </div>
      <div className="flex justify-center px-5 py-3">
        <a href="#" className="text-sm font-bold text-blue-600">
          Send us a message
        </a>
      </div>
    </div>
    </div>
    
    );
}

export default Per;




