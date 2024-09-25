import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import data from './data.jpg'
import './aboutus.css'; // Your custom CSS for styling

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-us" style={{ backgroundColor: '#0a101e', color: '#fff', padding: '50px 0' }}>
      <div className="container">
        <h1 data-aos="fade-up" className="page-title">About Us</h1>
        <p data-aos="fade-up" className="intro-text">
          Empower your business with intuitive ERP solutions. We transform your data into actionable insights to help you grow and succeed.
        </p>

        {/* Vision Section */}
        <div className="vision-section" data-aos="fade-up">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-text">
            In today’s data-driven world, small shop owners and entrepreneurs must harness the power of data to stay competitive. 
            Our models provide critical insights to help you track sales trends, predict future demand, and optimize your business strategy. 
            By leveraging advanced analytics, you can make informed decisions, reduce risks, and enhance your growth potential.
          </p>
          <div className="image-container">
            <img src={data} alt="Vision" className="vision-image" data-aos="fade-up"/>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="social-media-section" data-aos="fade-up">
          <h2 className="section-title">Connect with Us</h2>
          <div className="social-media">
            <div className="social-card" data-aos="fade-right">
            <i class="ri-github-fill"></i>
              <h3>GitHub</h3>
              <p>Find our code and projects.</p>
            </div>

            <div className="social-card" data-aos="fade-right">
            <i class="ri-linkedin-box-fill"></i>              <h3>LinkedIn</h3>
              <p>Connect with us professionally.</p>
            </div>

            <div className="social-card" data-aos="fade-right">
            <i class="ri-twitter-fill"></i>              <h3>Twitter</h3>
              <p>Follow us for updates and news.</p>
            </div>

            <div className="social-card" data-aos="fade-right">
            <i class="ri-whatsapp-fill"></i>              <h3>whatsapp</h3>
              <p>Join our community.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section" data-aos="fade-up">
          <p>Want to learn more about our models? <a href="/contact" className="link">Contact Us</a> for inquiries or collaborations.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
