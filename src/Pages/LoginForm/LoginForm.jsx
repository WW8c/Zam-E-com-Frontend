import React, { useState } from 'react';
import './LoginForm.scss';
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Select, Upload, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialTab = location.state?.tab || 'signin';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);

  // Error states for both forms
  const [signInErrors, setSignInErrors] = useState({
    email: '',
    password: '',
  });
  const [signUpErrors, setSignUpErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agree: '',
  });

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: undefined,
    state: undefined,
    zipCode: '',
    password: '',
    confirmPassword: '',
  });
  const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [agree, setAgree] = useState(false);
  const [fileList, setFileList] = useState([]);

  const countries = [
    { label: 'Pakistan', value: 'us' },
    // { label: 'Vietnam', value: 'vn' },
    // { label: 'United Kingdom', value: 'uk' },
  ];
  const states = [
    { label: 'Punjab', value: 'ny' },
    { label: 'Sindh', value: 'ca' },
    { label: 'Balochistan', value: 'tx' },
  ];
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (activeTab === 'signin') {
      // Sign In validation
      const errors = { email: '', password: '' };
      if (!signInEmail) {
        errors.email = 'Email is required';
      } else if (!validateEmail(signInEmail)) {
        errors.email = 'Invalid email format';
      }
      if (!signInPassword) {
        errors.password = 'Password is required';
      } else if (signInPassword.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      setSignInErrors(errors);
      if (errors.email || errors.password) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Sign In successful!');
          // Store token in localStorage (assuming your backend returns { token: '...' })
          localStorage.setItem('authToken', data.token);
          // Redirect to homepage
          navigate('/');
        } else {
          toast.error(data.message || 'Sign In failed!');
        }
      } catch (error) {
        toast.error('Sign In failed!');
      } finally {
        setLoading(false);
      }
    } else {
      // Sign Up validation
      const errors = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        state: '',
        zipCode: '',
        password: '',
        confirmPassword: '',
        agree: '',
      };

      if (!signUpData.firstName.trim()) errors.firstName = 'First name required';
      if (!signUpData.lastName.trim()) errors.lastName = 'Last name required';
      if (!signUpData.email) {
        errors.email = 'Email required';
      } else if (!validateEmail(signUpData.email)) {
        errors.email = 'Invalid email format';
      }
      // Phone validation: must not be empty and must be all digits, at least 7 digits
      if (!signUpData.phone.trim()) {
        errors.phone = 'Phone number required';
      } else if (!/^\d{11}$/.test(signUpData.phone)) {
  errors.phone = 'Phone number must be 11 digits';
}
      if (!signUpData.address.trim()) errors.address = 'Address required';
      if (!signUpData.country) errors.country = 'Country required';
      if (!signUpData.state) errors.state = 'State required';
      if (!signUpData.zipCode.trim()) {
        errors.zipCode = 'Zip code required';
      } else if (!/^\d+$/.test(signUpData.zipCode)) {
        errors.zipCode = 'Invalid zip code';
      }
      if (!signUpData.password) {
        errors.password = 'Password required';
      } else if (signUpData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (!signUpData.confirmPassword) {
        errors.confirmPassword = 'Confirm password required';
      } else if (signUpData.password !== signUpData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      if (!agree) errors.agree = 'You must agree to terms';

      setSignUpErrors(errors);

      // If any error exists, stop submission
      if (
        errors.firstName ||
        errors.lastName ||
        errors.email ||
        errors.phone ||
        errors.address ||
        errors.country ||
        errors.state ||
        errors.zipCode ||
        errors.password ||
        errors.confirmPassword ||
        errors.agree
      ) {
        setLoading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append('firstName', signUpData.firstName);
        formData.append('lastName', signUpData.lastName);
        formData.append('email', signUpData.email);
        formData.append('phone', signUpData.phone);
        formData.append('address', signUpData.address);
        formData.append('country', signUpData.country);
        formData.append('state', signUpData.state);
        formData.append('zipCode', signUpData.zipCode);
        formData.append('password', signUpData.password);
        formData.append('confirmPassword', signUpData.confirmPassword);

        if (fileList.length > 0) {
          formData.append('profilePhoto', fileList[0].originFileObj);
        }

        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          toast.success('Sign Up successful!');
          setActiveTab('signin');
          // Clear sign up form data after successful sign up
          setSignUpData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            country: undefined,
            state: undefined,
            zipCode: '',
            password: '',
            confirmPassword: '',
          });
          setSignUpErrors({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            state: '',
            zipCode: '',
            password: '',
            confirmPassword: '',
            agree: '',
          });
          setAgree(false);
          setFileList([]);
        } else {
          toast.error(data.message || 'Sign Up failed!');
        }
      } catch (error) {
        toast.error('Sign Up failed!');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-box">
      <div className="tab-row">
        <span
          className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('signin');
            setSignInErrors({ email: '', password: '' });
            setSignUpErrors({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              country: '',
              state: '',
              zipCode: '',
              password: '',
              confirmPassword: '',
              agree: '',
            });
          }}
        >
          Sign In
        </span>
        <span
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('signup');
            setSignInErrors({ email: '', password: '' });
            setSignUpErrors({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              country: '',
              state: '',
              zipCode: '',
              password: '',
              confirmPassword: '',
              agree: '',
            });
          }}
        >
          Sign Up
        </span>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {activeTab === 'signin' ? (
          <>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder=""
                value={signInEmail}
             onChange={(e) => {
  setSignInEmail(e.target.value);
  const isValid = validateEmail(e.target.value);
  setSignInErrors(prev => ({
    ...prev,
    email: isValid ? '' : prev.email
  }));
}}

              />
              {signInErrors.email && (
                <div className="error-message">{signInErrors.email}</div>
                
              )}

            </div>

            <div className="form-group password-group">
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password
                </Link>
              </div>
              <div className="password-input">
                <input
                  type={signInPasswordVisible ? 'text' : 'password'}
                  placeholder=""
                  value={signInPassword}
                onChange={(e) => {
  setSignInPassword(e.target.value);
  const isValid = e.target.value.length >= 8;
  setSignInErrors(prev => ({
    ...prev,
    password: isValid ? '' : prev.password
  }));
}}
                />
                <span
                  className="icon"
                  onClick={() =>
                    setSignInPasswordVisible(!signInPasswordVisible)
                  }
                >
                  {signInPasswordVisible ? (
                    <EyeTwoTone twoToneColor="#FA8232" />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
              {signInErrors.password && (
                <div className="error-message">{signInErrors.password}</div>
              )}
            </div>

            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? 'SIGNING IN...' : <>SIGN IN <ArrowRightOutlined className="arrow" /></>}
            </button>
          </>
        ) : (
          <>
            <div className="form-group" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {/* <label>Profile Photo</label> */}
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                onPreview={handlePreview}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={signUpData.firstName}
              onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, firstName: value }));
  setSignUpErrors(prev => ({
    ...prev,
    firstName: value.trim() ? '' : prev.firstName
  }));
}}
              />
              {signUpErrors.firstName && (
                <div className="error-message">{signUpErrors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={signUpData.lastName}
              onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, lastName: value }));
  setSignUpErrors(prev => ({
    ...prev,
    lastName: value.trim() ? '' : prev.lastName
  }));
}}
              />
              {signUpErrors.lastName && (
                <div className="error-message">{signUpErrors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={signUpData.email}
              onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, email: value }));
  const isValid = validateEmail(value);
  setSignUpErrors(prev => ({
    ...prev,
    email: isValid ? '' : prev.email
  }));
}}
              />
              {signUpErrors.email && (
                <div className="error-message">{signUpErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={signUpData.phone}
               onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, phone: value }));
  const isValid = /^\d{7,}$/.test(value);
  setSignUpErrors(prev => ({
    ...prev,
    phone: isValid ? '' : prev.phone
  }));
}}
              />
              {signUpErrors.phone && (
                <div className="error-message">{signUpErrors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={signUpData.address}
              onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, address: value }));
  setSignUpErrors(prev => ({
    ...prev,
    address: value.trim() ? '' : prev.address
  }));
}}
              />
              {signUpErrors.address && (
                <div className="error-message">{signUpErrors.address}</div>
              )}
            </div>

            <div className="form-group">
              <label>Country/Region</label>
              <Select
                options={countries}
                placeholder="Select Country"
                className="custom-select"
                size="large"
                value={signUpData.country}
               onChange={(value) => {
  setSignUpData(prev => ({ ...prev, country: value }));
  setSignUpErrors(prev => ({
    ...prev,
    country: value ? '' : prev.country
  }));
}}
              />
              {signUpErrors.country && (
                <div className="error-message">{signUpErrors.country}</div>
              )}
            </div>

            <div className="form-group">
              <label>State</label>
              <Select
                options={states}
                placeholder="Select State"
                className="custom-select"
                size="large"
                value={signUpData.state}
          onChange={(value) => {
  setSignUpData(prev => ({ ...prev, state: value }));
  setSignUpErrors(prev => ({
    ...prev,
    state: value ? '' : prev.state
  }));
}}
              />
              {signUpErrors.state && (
                <div className="error-message">{signUpErrors.state}</div>
              )}
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                placeholder="Enter your zip code"
                value={signUpData.zipCode}
               onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, zipCode: value }));
  const isValid = /^\d+$/.test(value);
  setSignUpErrors(prev => ({
    ...prev,
    zipCode: isValid ? '' : prev.zipCode
  }));
}}

              />
              {signUpErrors.zipCode && (
                <div className="error-message">{signUpErrors.zipCode}</div>
              )}
            </div>

            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={signUpPasswordVisible ? 'text' : 'password'}
                  placeholder="8+ characters"
                  value={signUpData.password}
                 onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, password: value }));
  const isValid = value.length >= 8;
  setSignUpErrors(prev => ({
    ...prev,
    password: isValid ? '' : prev.password,
    confirmPassword: (value === prev.confirmPassword) ? '' : prev.confirmPassword
  }));
}}
                />
                <span
                  className="icon"
                  onClick={() =>
                    setSignUpPasswordVisible(!signUpPasswordVisible)
                  }
                >
                  {signUpPasswordVisible ? (
                    <EyeTwoTone twoToneColor="#FA8232" />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
              {signUpErrors.password && (
                <div className="error-message">{signUpErrors.password}</div>
              )}
            </div>

            <div className="form-group password-group">
              <label>Confirm Password</label>
              <div className="password-input">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder=""
                  value={signUpData.confirmPassword}
                 onChange={(e) => {
  const value = e.target.value;
  setSignUpData(prev => ({ ...prev, confirmPassword: value }));
  const isValid = value === signUpData.password;
  setSignUpErrors(prev => ({
    ...prev,
    confirmPassword: isValid ? '' : prev.confirmPassword
  }));
}}
                />
                <span
                  className="icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <EyeTwoTone twoToneColor="#FA8232" />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              </div>
              {signUpErrors.confirmPassword && (
                <div className="error-message">{signUpErrors.confirmPassword}</div>
              )}
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
             onChange={() => {
  setAgree(!agree);
  setSignUpErrors(prev => ({
    ...prev,
    agree: !agree ? '' : prev.agree
  }));
}}
              />
              <label htmlFor="agree">
                Are you agree to Clicon{' '}
                <span className="link">Terms of Condition</span> and{' '}
                <span className="link">Privacy Policy</span>.
              </label>
            </div>
              {signUpErrors.agree && (
                <div className="error-message">{signUpErrors.agree}</div>
              )}
            <button type="submit" className="btn-signup" disabled={loading} style={{ marginTop: '20px' }}>
              {loading ? 'SIGNING UP' : <>SIGN UP <ArrowRightOutlined className="arrow" /></>}
            </button>
          </>
        )}
      </form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
