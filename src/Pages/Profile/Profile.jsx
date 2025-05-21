import React, { useState } from 'react';
import { Input, Row, Col, Divider, Form, Select, Upload, Image,Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Profile.scss';


const Profile = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);  // Updated to remove TypeScript type annotation

  const countries = ['Bangladesh', 'India', 'USA', 'Canada'];
  const states = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'];

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    };
    

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      {/* Profile Section */}
      <div className="profile-container">
        <h2 className="profile-heading">Account Settings</h2>
        <Divider />

        <Row gutter={32}>
          {/* Left: Profile Image */}
          <Col xs={24} md={6} className="profile-img-section">
          <Upload
  listType="picture-card"
  fileList={fileList}
  onPreview={handlePreview}
  onChange={handleChange}
  onRemove={handleRemove}
  beforeUpload={() => false}
>
  {fileList.length >= 1 ? null : uploadButton}
</Upload>

<Modal
  open={previewOpen}
  // title="Image Preview"
  footer={null}
  onCancel={() => setPreviewOpen(false)}
>
  <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
</Modal>

          </Col>

          {/* Right: Form Inputs */}
          <Col xs={24} md={18}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="First Name">
                    <Input placeholder="Kevin Gilbert" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Last Name">
                    <Input placeholder="Smith" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Email">
                    <Input placeholder="Kevin.gilbert@gmail.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Phone Number">
                    <Input placeholder="+1-202-555-0118" />
                  </Form.Item>
                </Col>
                
              </Row>

{/* Full-width Address Input */}
<Row gutter={16}>
  <Col span={24}>
    <Form.Item label="Address">
      <Input placeholder="123 Main Street, Apt 4B" />
    </Form.Item>
  </Col>
</Row>
              {/* Address Inputs */}
              <Row gutter={16} className="address-row">
                <Col xs={24} md={8}>
                  <Form.Item label="Country/Region">
                    <Select placeholder="Select Country" className="address-input">
                      {countries.map((country) => (
                        <Select.Option key={country} value={country}>
                          {country}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="State">
                    <Select placeholder="Select State" className="address-input">
                      {states.map((state) => (
                        <Select.Option key={state} value={state}>
                          {state}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Zip Code">
                    <Input placeholder="1207" className="address-input" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <button className="custom-save-btn">Save Changes</button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Change Password Section */}
      <div className="change-password-container">
        <h3 className="change-password-heading">Change Password</h3>
        <Divider />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password placeholder="At least 8 characters" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: 'Please input your new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' },
                ]}
              >
                <Input.Password placeholder="8+ characters" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <button className="custom-save-btn">Change Password</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
