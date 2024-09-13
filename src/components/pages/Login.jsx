import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donors'); // New state for selecting role
  const [redirect, setRedirect] = useState(''); // State for redirection
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPass = localStorage.getItem('rememberedpass');
    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPass);
    }
  }, []);

  async function loginUser(ev) {
    ev.preventDefault();

    try {
   
      const response = await axios.post(
        `http://localhost:4000/api/${role}/login`, 
        { email, password },
        { withCredentials: true }
      );
      const { token, donor } = response.data;

      alert('Login success');

      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedpass', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedpass');
      }

      // Store token and donorId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('donorId', donor._id);

      // Set redirect to navigate
      setRedirect('/profile'); 
    } catch (e) {
      console.error('Login failed:', e.response ? e.response.data : e.message);
      alert('Login failed');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-zinc-900">
      {/* Main login form */}
      <div className="bg-white shadow-lg w-full sm:w-full md:w-2/3 lg:w-1/3 px-8 py-10 rounded-xl flex flex-col items-center">
        <form className="flex flex-col w-full" onSubmit={loginUser}>
          <h1 className="text-3xl font-extrabold text-primarydark mb-6 text-center text-black">Sign In</h1>

          {/* Email input */}
          <div className="flex items-center w-full mb-4 bg-gray-100 rounded-lg p-3">
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-black-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full text-black focus:outline-none"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          {/* Password input */}
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

          {/* Role Selection */}
          <div className="flex justify-between w-full mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="role"
                value="donors"
                checked={role === 'donors'}
                onChange={() => setRole('donors')}
              />
              Donor
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="role"
                value="org"
                checked={role === 'org'}
                onChange={() => setRole('org')}
              />
              Organization
            </label>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex justify-between w-full mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)} />
              Remember Me
            </label>
            <Link to="/forgotpassword" className="text-sm text-primarydark hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-all text-center"
          >
            Sign in
          </button>

          {/* Sign up link */}
          <div className="flex justify-between items-center w-full mt-6 text-sm text-gray-700">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-primarydark hover:underline">
              Sign Up
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
