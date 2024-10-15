import React, { useState, useEffect } from 'react';
import '../../styles/Aboutstyle.css'

const About = () => {
  const [showHindi, setShowHindi] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHindi((prev) => !prev);
    }, 3000); // Switch every 5 seconds

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white py-16 px-8'>
      <div className='max-w-5xl mx-auto'>
        
        {/* Introduction Section */}
        <section className='mb-12'>
          <h1 className='text-4xl font-extrabold text-center mt-6 mb-6 text-blue-400'>
            {showHindi ? "दानमित्र" : "DANMITRA"}
          </h1>
          <p className='text-lg text-gray-300 text-center'>
            Dānamitra is a donation platform that empowers individuals and organizations to support niche causes. Whether it's funding community projects, assisting in times of crisis, or contributing to educational programs, 
            Dānamitra bridges the gap between donors and those in need. Our goal is to simplify and enhance the experience of giving by leveraging technology for good.
          </p>
        </section>

        {/* Mission Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-semibold mb-4 text-center text-lime-400'>
            Our Mission
          </h2>
          <p className='text-lg text-gray-300'>
            Our mission is to create a world where acts of generosity are accessible and impactful for all. We believe in transparency, accountability, and the power of community. 
            By offering a streamlined platform, we allow donors to connect with trusted campaigns and causes, making it easy for them to contribute to the greater good.
          </p>
        </section>

        {/* Key Features Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-semibold text-center mb-4 text-turquoise-400'>Key Features</h2>
          <ul className='list-disc list-inside text-gray-300'>
            <li>Secure donations with full transparency</li>
            <li>Easy campaign creation for organizations and individuals</li>
            <li>Track donations and the impact they have made</li>
            <li>Support for niche causes and local community projects</li>
            <li>User-friendly interface and seamless donation process</li>
          </ul>
        </section>

        {/* Quotes Section */}
        <section className='mb-12'>
          <div className='relative overflow-hidden text-4xl h-20'>
            <div className='marquee flex'>
            <blockquote className='text-xl italic text-gray-300 mr-16 whitespace-nowrap'>
            "जिसका अभिप्राय या निःस्वार्थता से दान दिया जाता है, वह दान पुण्य के अधिक प्रभावी होता है।"
              </blockquote>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section>
          <p className='text-lg text-gray-300'>
            At Dānamitra, we believe that everyone has the potential to make a difference. By providing a platform that connects compassionate donors with worthy causes, we aim to 
            create a ripple effect of generosity that can change lives. Together, we can build a better, more giving world.
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;
