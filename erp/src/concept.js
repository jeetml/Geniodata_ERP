import React, { useEffect } from 'react';
import per1 from './per_excel.png';
import per2 from './img/per_data.png';
import per3 from './per_bar.png';
import per4 from './img/per_hover.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRegLightbulb, FaDatabase, FaCog, FaChartLine } from 'react-icons/fa'; // Icons for visuals

const Concept = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Smooth animation duration
      easing: 'ease-in-out-sine', // Custom easing for smoother effect
      once: true, // Only animate once when in view
    });
  }, []);

  const items = [
    { img: per1, alt: "Stock Performance 1", text: "Step 1: Upload an Excel file with columns like Product_name, brand, model, number of stocks, purchase price, selling price, and days to sell.", icon: <FaDatabase size={50} className="text-blue-400" /> },
    { img: per2, alt: "Stock Performance 2", text: "Step 2: The model processes the data to analyze trends and predict performance.", icon: <FaCog size={50} className="text-green-400" /> },
    { img: per4, alt: "Stock Performance 4", text: "Step 3:The results are visualized through hover interactions, providing enhanced insights into stock performance.", icon: <FaChartLine size={50} className="text-red-400" /> }
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Title */}
      <h1 className="text-4xl text-white text-center mb-12" data-aos="zoom-in" data-aos-duration="1200">
        How Stock Performance ML Model Works
      </h1>

      {items.map((item, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16`}
          data-aos="fade-up"
        >
          {/* Image section with hover effect */}
          <div className="w-full md:w-1/2 relative group">
            <div className="border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-auto max-w-full transform group-hover:scale-105 transition duration-500">
              <div className="rounded-xl overflow-hidden">
                <img src={item.img} className="w-full h-auto rounded-xl" alt={item.alt} />
              </div>
              {/* Add hover text */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-lg">Explore Stock Data</span>
              </div>
            </div>
          </div>

          {/* Text section with animation */}
          <div className="w-full md:w-1/2 p-4 text-white">
            {/* Icon for visual cue */}
            <div className="flex items-center mb-4">
              {item.icon}
              <h2 className="ml-4 text-2xl font-bold">{`Step ${index + 1}`}</h2>
            </div>
            <p className="text-lg" data-aos="fade-up" data-aos-delay="100">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Concept;
