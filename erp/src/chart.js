// import React, { useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// function Chart() {
//     const [charts, setCharts] = useState({});
//     const [error, setError] = useState('');
//     const [fileName, setFileName] = useState('');

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setFileName(file.name);
//         const formData = new FormData();
//         formData.append('file', file);

//         axios.post('http://localhost:5000/upload', formData)
//             .then(response => {
//                 setCharts(response.data);
//                 setError('');
//             })
//             .catch(err => {
//                 setError('Failed to upload file');
//                 console.error(err);
//             });
//     };

//     // Custom layout configuration
//     const customLayout = {
//         width: 1200,
//         height: 600,
//         paper_bgcolor: '#0a101e',
//         plot_bgcolor: '#0a101e',
//         font: {
//             color: '#fff'
//         },
//         bgcolor: '#222',
//     };

//     return (
//         <div className="p-6 bg-gray-900 min-h-screen">
//             <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-bold text-white mb-4">Upload CSV File for Analysis</h1>
//                 <div className="flex items-center mb-4">
//                     <input
//                         type="file"
//                         accept=".csv"
//                         id="fileInput"
//                         onChange={handleFileChange}
//                         className="hidden"
//                     />
//                     <button
//                         onClick={() => document.getElementById('fileInput').click()}
//                         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     >
//                         Choose File
//                     </button>
//                     <span className="text-gray-400 ml-4">{fileName || 'No file chosen'}</span>
//                 </div>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//                 {Object.keys(charts).map(key => {
//                     const chartData = JSON.parse(charts[key]);
//                     return (
//                         <div key={key} className="mt-6">
//                             <h3 className="text-xl font-semibold text-white">{key.replace(/_/g, ' ')}</h3>
//                             <div>
//                                 <Plot
//                                     data={chartData.data}
//                                     layout={{ ...customLayout, ...chartData.layout }}
//                                 />
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

// export default Chart;




import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { FiUploadCloud } from 'react-icons/fi';

function Chart() {
    const [charts, setCharts] = useState({});
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Start loading
        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                setCharts(response.data);
                setError('');
            })
            .catch(err => {
                setError('Failed to upload file');
                console.error(err);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
            //     // Custom layout configuration

    };
    const customLayout = {
        // width: 1200,
        // height: 600,
        paper_bgcolor: '#0a101e',
        plot_bgcolor: '#0a101e',
        font: {
            color: '#fff'
        },
        bgcolor: '#222',
    };

    return (
        <div className="p-6 bg-[#0a101e] min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full p-6 rounded-lg shadow-lg bg-gray-800">
                <h1 className="text-2xl font-bold text-white mb-6">Upload CSV File for Analysis</h1>
                <div className="flex justify-center items-center mb-6">
                    <input
                        type="file"
                        accept=".csv"
                        id="fileInput"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <button
                        onClick={() => document.getElementById('fileInput').click()}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg flex items-center hover:bg-blue-600 transition duration-200"
                    >
                        <FiUploadCloud className="mr-2" size={20} /> Choose File
                    </button>
                    <span className="text-gray-400 ml-4">{fileName || 'No file chosen'}</span>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {loading && (
                    <div className="flex justify-center mt-6">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
                    </div>
                )}

                {!loading && Object.keys(charts).length > 0 && (
                    <div className="flex flex-col space-y-6">
                        {Object.keys(charts).map(key => {
                            const chartData = JSON.parse(charts[key]);
                            return (
                                <div 
                                    key={key} 
                                    className="w-full bg-gray-700 p-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-600 hover:shadow-xl hover:scale-125"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-4">{key.replace(/_/g, ' ')}</h3>
                                    <Plot
                                        data={chartData.data}
                                        layout={{ ...customLayout, ...chartData.layout }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Basic Loading Spinner */}
            <style>{`
                .loader {
                    border-top-color: #3498db;
                    animation: spinner 1.5s linear infinite;
                }
                @keyframes spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default Chart;





