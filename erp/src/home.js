import React, { useState, useEffect } from 'react'
import './home.css'
import logo from './pie-chart.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import  img4 from "./hand-drawn-business-coffee-illustration.png";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
    });
  }, []);
  //https://deepmind.google/technologies/gemini/
  return (
    <div>
    <div class="body">
    <div class="header">
    <br></br>
    <br></br>
    <i  data-aos="fade-up" data-aos-easing="linear"
          data-aos-duration="800"
    class="ri-pie-chart-2-fill text-7xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text"></i>
    <br></br>
    <br></br>
    <h1   data-aos="fade-up" data-aos-easing="linear"
          data-aos-duration="500"
    className='text-9xl text-white'>GenioData Models</h1>
    <br></br>
    <br></br>
    <h1             className="text-base text-white mb-3"
            style={{ fontFamily: "Poppins" }}
            data-aos="fade-up" data-aos-easing="linear"
          data-aos-duration="600"
   >Empower your business with intuitive ERP solutions.Transform data into actionable insights</h1>
    <br></br>
    <br></br>

    <div data-aos="fade-up" data-aos-easing="linear"
          data-aos-duration="700">
    <a href="#" class="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 bg-[#141720] dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={img4} alt=""/>
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology , Empowering businesses through predictive analytics for smarter inventory management.r.</p>
    </div>
   </a>
   </div>

    
</div>
</div>
  <br></br>
  <br></br>
  <div className="middle">
        <br></br>
        <h1 className="text-4xl text-white" data-aos="fade-up">
          These charts will be displayed in feather models.
        </h1>
        <br></br>
        <br></br>
      </div>

      <div className="flex justify-center chart" data-aos="fade-up">
        <i class="ri-bar-chart-2-fill text-8xl text-blue-700 m-20"></i>
        <i class="ri-pie-chart-2-line text-8xl  text-blue-700  m-20"></i>
        <i class="ri-bubble-chart-line text-8xl  text-blue-700  m-20"></i>
        <i class="ri-line-chart-line text-8xl  text-blue-700  m-20"></i>
      </div>
      <br></br>
      <br></br>
      <div className="middle">
        <h1 className="text-white text-4xl" data-aos="fade-up">Our most versatile models</h1>
        <br />
        <br />
        <div
          className="flex justify-center content-center bg-[#0a101e] text-white rounded-md"
          style={{ width: "800px", height: "100px" }}
        >
          <p className="text-center" data-aos="fade-up">
            Each of our models is designed for specific use cases, creating a
            versatile ERP solution that operates efficiently by processing
            inputs and providing clear, easy-to-understand explanations.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div class="m-5 ml-10 mr-10 grid min-h-[100px] gap-8 p-6 md:grid-cols-2">
        <div data-aos="fade-up" data-aos-duration="400"
          class="relative aspect-square rounded-xl border border-[#121212] bg-black shadow-lg transition duration-300 hover:border-2 hover:border-blue-600"
          id="box"
        >
          <img
            src={img1}
            class="w-2/3 scale-100 mt-7 hover:scale-110 transition duration-300 mx-auto rounded-xl object-fill p-5"
            alt=""
          />
          <div class="absolute bottom-0 h-1/4 w-full rounded-xl bg-[#0d0d0d]">
            <p class="absolute z-10 p-4 pl-5 md:text-2xl sm:text-xl text-lg text-white">
              Product Percentage
            </p>
            <p class="absolute top-9 z-10 p-4 pl-5 text-sm text-slate-400 hidden md:block ">
              Get a clear view of how each product is performing in your store.
              This feature displays the percentage contribution of each product
              to your total sales, helping you understand which items are
              driving your revenue and which might need more attention
            </p>
            <i class="ri-arrow-right-line absolute bottom-0 right-0 z-10 p-4 pr-6 text-lg text-blue-600 hidden md:block"></i>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="600"
          class="relative aspect-square rounded-xl border border-[#121212] bg-black shadow-lg transition duration-300 hover:border-2 hover:border-blue-600"
          id="box"
        >
          <img
            src={img2} 
            class="w-2/3 scale-110 mt-7 hover:scale-125 transition duration-300 mx-auto rounded-xl object-fill p-5"
            alt=""
          />
          <div class="absolute bottom-0 h-1/4 w-full rounded-xl bg-[#0d0d0d]">
            <p class="absolute z-10 p-4 pl-5 md:text-2xl sm:text-xl text-lg text-white">
              Future Prediction
            </p>
            <p class="absolute top-9 z-10 p-4 pl-5 text-sm text-slate-400 hidden md:block">
              Plan ahead with confidence. Our advanced predictive analytics
              feature forecasts future sales trends based on historical data,
              enabling you to make informed decisions about inventory,
              promotions, and growth strategies
            </p>
            <i class="ri-arrow-right-line absolute bottom-0 right-0 z-10 p-4 pr-6 text-lg text-blue-600 hidden md:block"></i>
          </div>
        </div>
        
  <div data-aos="fade-up" data-aos-duration="400" class="relative aspect-square rounded-xl border border-[#121212] bg-black shadow-lg transition duration-300 hover:border-2 hover:border-blue-600" id="box">
    <img src={img3} class="w-2/3 scale-110 mt-7 hover:scale-125 transition duration-300 mx-auto rounded-xl object-fill p-5" alt="" />
    <div class="absolute bottom-0 h-1/4 w-full rounded-xl bg-[#0d0d0d]">
      <p class="absolute z-10 p-4 pl-5 md:text-2xl sm:text-xl text-lg text-white">Dynamic Price Comparison</p>
      <p class="absolute top-9 z-10 p-4 pl-5 text-sm text-slate-400 hidden md:block">Stay competitive with real-time price comparisons. This feature
              allows you to dynamically compare your product prices with those
              of your competitors, ensuring that you're always offering the best
              value and maximizing your profitability.</p>
      <i class="ri-arrow-right-line absolute bottom-0 right-0 z-10 p-4 pr-6 text-lg text-blue-600 hidden md:block"></i>
    </div>
  </div>

  <div data-aos="fade-up" data-aos-duration="600" class="relative aspect-square rounded-xl border border-[#121212] bg-black shadow-lg transition duration-300 hover:border-2 hover:border-blue-600" id="box">
  <img
            src={img1}
            class="w-2/3 scale-100 mt-7 hover:scale-110 transition duration-300 mx-auto rounded-xl object-fill p-5"
            alt=""
          />
    <div class="absolute bottom-0 h-1/4 w-full rounded-xl bg-[#0d0d0d]">
      <p class="absolute z-10 p-4 pl-5 md:text-2xl sm:text-xl text-lg text-white">Sales Chart Generation</p>
      <p class="absolute top-9 z-10 p-4 pl-5 text-sm text-slate-400 hidden md:block">Visualize your sales data with ease. Generate insightful charts
              that highlight key sales metrics over time, allowing you to spot
              trends, track performance, and make data-driven decisions for your
              business</p>
      <i class="ri-arrow-right-line absolute bottom-0 right-0 z-10 p-4 pr-6 text-lg text-blue-600 hidden md:block"></i>
    </div>
  </div>
  
       
      </div>
      {/* <Footer/> */}
    </div>
  );
};
export default Home;
