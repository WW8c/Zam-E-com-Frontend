import React, { useState } from 'react';
import './LoginForm.scss';
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Select, Upload,Modal } from 'antd';

const LoginForm = () => {
  const location = useLocation();
  const initialTab = location.state?.tab || 'signin';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
  const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [fileList, setFileList] = useState([]);

  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'Vietnam', value: 'vn' },
    { label: 'United Kingdom', value: 'uk' },
  ];
  const states = [
    { label: 'New York', value: 'ny' },
    { label: 'California', value: 'ca' },
    { label: 'Texas', value: 'tx' },
  ];
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

  return (
    <div className="login-box">
      <div className="tab-row">
        <span
          className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => setActiveTab('signin')}
        >
          Sign In
        </span>
        <span
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </span>
      </div>

      <form className="form">
        {activeTab === 'signin' ? (
          <>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="" />
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
            </div>

            <button type="submit" className="btn-signin">
              SIGN IN <ArrowRightOutlined className="arrow" />
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Profile Photo</label>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                onPreview={handlePreview} // <-- this line
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
              <input type="text" placeholder="Enter your first name" />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email"  />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Enter your address" />
            </div>

            <div className="form-group">
              <label>Country/Region</label>
              <Select
                options={countries}
                placeholder="Select Country"
                className="custom-select"
                size="large"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <Select
                options={states}
                placeholder="Select State"
                className="custom-select"
                size="large"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" placeholder="Enter your zip code" />
            </div>

            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={signUpPasswordVisible ? 'text' : 'password'}
                  placeholder="8+ characters"
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
            </div>

            <div className="form-group password-group">
              <label>Confirm Password</label>
              <div className="password-input">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder=""
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
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label htmlFor="agree">
                Are you agree to Clicon{' '}
                <span className="link">Terms of Condition</span> and{' '}
                <span className="link">Privacy Policy</span>.
              </label>
            </div>

            <button type="submit" className="btn-signup">
              SIGN UP <ArrowRightOutlined className="arrow" />
            </button>
          </>
        )}
      </form>
      <Modal
        open={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default LoginForm;
