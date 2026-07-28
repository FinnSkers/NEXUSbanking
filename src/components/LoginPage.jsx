import React, { useState } from 'react';
import { Hexagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/login.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { login, signup, isLoading, error: authError } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    try {
      if (isSignup) {
        if (!firstName || !lastName || !email || !password) {
          setLocalError('Please fill in all fields');
          return;
        }
        await signup(firstName, lastName, email, password);
        addToast('Account created successfully! Welcome!', 'success');
      } else {
        if (!email || !password) {
          setLocalError('Please enter email and password');
          return;
        }
        await login(email, password);
        addToast('Welcome back!', 'success');
      }
    } catch (err) {
      const errMsg = err.message || authError || 'Authentication failed';
      setLocalError(errMsg);
      addToast(errMsg, 'error');
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setLocalError('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const displayError = localError || authError;

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-bg"></div>
        <div className="login-hero-content">
          <div className="login-hero-logo">
            <img src="/logo.png" alt="NEXUS Logo" style={{ width: 52, height: 52, objectFit: 'contain' }} />
            <span>NEXUS</span>
          </div>
          <p className="login-hero-tagline">Banking reimagined for the modern world.</p>
        </div>
      </div>
      
      <div className="login-form-side">
        <div className="login-form">
          <div className="login-mobile-logo">
            <img src="/logo.png" alt="NEXUS Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span>NEXUS</span>
          </div>
          
          <h2 className="login-form-title">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-form-subtitle">
            {isSignup ? 'Join Nexus today and take control of your finances.' : 'Enter your details to access your account.'}
          </p>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div className="form-field">
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-field">
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </>
            )}

            <div className="form-field">
              <input 
                type="email" 
                id="email" 
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            
            <div className="form-field">
              <input 
                type="password" 
                id="password" 
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            {displayError && <div className="login-error">{displayError}</div>}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <div className="login-spinner"></div>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="login-switch">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button type="button" onClick={toggleMode}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
