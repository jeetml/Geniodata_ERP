import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function App() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    // Function to dynamically load the Plotly script
    const loadPlotlyScript = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
        script.async = true;
        document.body.appendChild(script);
    };

    useEffect(() => {
        loadPlotlyScript();  // Load the Plotly script when the component mounts
    }, []);

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

    return (
        <div className="App">
            <h1>Stock Performance Prediction</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Predict</button>

            {data.length > 0 && (
                <Plot
                    data={[
                        {
                            x: data.map(item => item.model),
                            y: data.map(item => item.performance_percentage),
                            type: 'scatter',
                            mode: 'markers',
                            marker: { 
                                size: data.map(item=>item.performance_percentage/2),
                                //i want the color to product_model 
                                // and groupd by the product_model
                                color: data.map(item=>item.performance_percentage),
                                colorscale: 'Viridis',
                                opacity: 0.8,
                                
                            },
                        },
                    ]}
                    layout={{ 
                        title: 'Performance Percentages of Products',
                        xaxis: { title: 'Model' }, 
                        yaxis: { title: 'Performance Percentage (%)' },
                        //dark theme in plotly
                        template: 'plotly_dark',
                        width: 1200,  // Increased width
                        height: 600,  // Increased height
                    }}
                />
            )}
        </div>
    );
}

export default App;
