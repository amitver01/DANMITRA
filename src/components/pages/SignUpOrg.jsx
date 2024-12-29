import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faGlobe , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function OrgSignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [description, setDescription] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function registerOrganization(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('https://danamitra-backend.vercel.app/api/organizations/register', {
        name,
        email,
        password,
        phone,
        website,
        address,
        description
      });
      alert('Organization registration successful');
      setRedirect(true);
    } catch (e) {
      console.error('Registration failed:', e.response ? e.response.data : e.message);
      alert('Registration failed');
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-zinc-900">
      <div className="bg-zinc-900 shadow-lg w-full mt-12 sm:w-full md:w-3/4 lg:w-2/3 px-8 py-10 rounded-xl flex flex-col items-center">
        <form className="flex flex-col w-full" onSubmit={registerOrganization}>
          <h1 className="text-3xl font-extrabold text-primarydark mb-6 text-center text-black">Organization Sign Up</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Left Column: Organization Details */}
            <div>
              {/* Organization Name */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Organization Name"
                  className="bg-transparent w-full text-black focus:outline-none"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>

              {/* Email */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent w-full text-black focus:outline-none"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3 relative">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="bg-transparent text-black w-full focus:outline-none"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <div
                  type="button"
                  className="absolute right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3 relative">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="bg-transparent text-black w-full focus:outline-none"
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                />
                <div
                  type="button"
                  className="absolute right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="bg-transparent w-full text-black focus:outline-none"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                />
              </div>

              {/* Website */}
              <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3">
                <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Website"
                  className="bg-transparent w-full text-black focus:outline-none"
                  value={website}
                  onChange={(ev) => setWebsite(ev.target.value)}
                />
              </div>
            </div>

            {/* Right Column: Address and Description */}
            <div>
              <h2 className="text-lg font-bold text-primarydark mb-2">Address</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full mb-2 bg-gray-100 p-3 rounded-lg focus:outline-none text-black"
                  value={address.street}
                  onChange={(ev) => setAddress({ ...address, street: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full mb-2 bg-gray-100 p-3 rounded-lg focus:outline-none text-black"
                  value={address.city}
                  onChange={(ev) => setAddress({ ...address, city: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full mb-2 bg-gray-100 p-3 rounded-lg focus:outline-none text-black"
                  value={address.state}
                  onChange={(ev) => setAddress({ ...address, state: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full mb-2 bg-gray-100 p-3 rounded-lg focus:outline-none text-black"
                  value={address.postalCode}
                  onChange={(ev) => setAddress({ ...address, postalCode: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none text-black"
                  value={address.country}
                  onChange={(ev) => setAddress({ ...address, country: ev.target.value })}
                />
              </div>

              {/* Description */}
              <div className="w-full mb-4 bg-gray-100 rounded-lg p-3">
                <textarea
                  placeholder="Description"
                  className="bg-transparent w-full text-black focus:outline-none"
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-all text-center"
          >
            Sign Up
          </button>

          {/* Sign in link */}
          <div className="flex justify-between items-center w-full mt-6 text-sm text-gray-700">
            <span>Already have an account?</span>
            <Link to="/login" className="text-primarydark hover:underline">
              Sign In
            </Link>
          </div>

          {/* Back to home button */}
          <Link to="/" className="w-full mt-4">
            <button
              className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition-all text-center"
            >
              Back to Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
