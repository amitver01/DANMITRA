import React, { useState } from 'react';
import '../../styles/Contactstyle.css'; // Ensure you create this CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white py-16 px-8'>
      <div className='max-w-5xl mx-auto'>
        
        {/* Introduction Section */}
        <section className='mb-12'>
          <h1 className='text-4xl font-extrabold text-center mt-6 mb-6 text-blue-400'>
            Contact Us
          </h1>
          <p className='text-lg text-gray-300 text-center'>
            We would love to hear from you! Whether you have questions, feedback, or just want to get in touch, feel free to reach out to us through the contact form below.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className='mb-12'>
          <div className='bg-gray-800 p-8 rounded-lg'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className='text-lg mb-2 text-blue-400' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='bg-gray-700 text-white p-3 rounded-lg mb-4'
                required
              />

              <label className='text-lg mb-2 text-blue-400' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='bg-gray-700 text-white p-3 rounded-lg mb-4'
                required
              />

              <label className='text-lg mb-2 text-blue-400' htmlFor='message'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='bg-gray-700 text-white p-3 rounded-lg mb-4'
                rows='5'
                required
              />

              <button
                type='submit'
                className='bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-all text-center'
              >
                Send Message
              </button>
            </form>
            {formStatus && <p className='mt-4 text-center text-lime-400'>{formStatus}</p>}
          </div>
        </section>

        {/* Contact Information Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-semibold text-center mb-4 text-blue-400'>Contact Information</h2>
          <div className='text-center'>
            <p className='text-lg text-gray-300 mb-4'>
              <span className='font-semibold text-blue-400'>Address:</span> 123 Donation St, Generosity City, GIV 12345
            </p>
            <p className='text-lg text-gray-300 mb-4'>
              <span className='font-semibold text-blue-400'>Email:</span> <a href='mailto:contact@danmitra.com' className='text-blue-400 hover:underline'>contact@danmitra.com</a>
            </p>
            <p className='text-lg text-gray-300'>
              <span className='font-semibold text-blue-400'>Phone:</span> +1 (234) 567-890
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Contact;
