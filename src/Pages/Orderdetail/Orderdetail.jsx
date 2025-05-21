import React from 'react';
import { Button, Steps, Modal, Rate, Input, Form, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  ShoppingOutlined,
  GiftOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CheckCircleTwoTone,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import './OrderDetail.scss';
import { product1, product2 } from '../../assets';

const { Step } = Steps;

const orderActivities = [
  {
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    text: 'Your order has been delivered. Thank you for shopping at Clicon!',
    date: '23 Jan, 2021 at 7:32 PM',
    color: 'green'
  },
  {
    icon: <UserAddOutlined style={{ color: '#1890ff' }} />,
    text: 'Our delivery man (John Wick) has picked up your order for delivery.',
    date: '23 Jan, 2021 at 2:00 PM',
    color: 'blue'
  },
  {
    icon: <EnvironmentOutlined style={{ color: '#1890ff' }} />,
    text: 'Your order has reached the last mile hub.',
    date: '22 Jan, 2021 at 8:00 AM',
    color: 'blue'
  },
  {
    icon: <ClockCircleOutlined style={{ color: '#52c41a' }} />,
    text: 'Your order is on the way to the (last mile) hub.',
    date: '21 Jan, 2021 at 5:32 AM',
    color: 'green'
  },
  {
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    text: 'Your order is successfully verified.',
    date: '20 Jan, 2021 at 7:32 PM',
    color: 'green'
  },
  {
    icon: <ShoppingOutlined style={{ color: '#1890ff' }} />,
    text: 'Your order has been confirmed.',
    date: '19 Jan, 2021 at 2:61 PM',
    color: 'blue'
  }
];

// Define the columns for the order products table
const productColumns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (text, record) => (
      <div className="product-info">
        <img src={record.image} alt={record.productType} />
        <div>
          <strong>{record.productType}</strong>
          <p>{record.description}</p>
        </div>
      </div>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Sub-Total',
    dataIndex: 'subTotal',
    key: 'subTotal'
  }
];

// Define the data for the order products table
const productData = [
  {
    key: '1',
    image: product1,
    productType: 'SMARTPHONE',
    description: 'Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...',
    price: '$899',
    quantity: 'x1',
    subTotal: '$899'
  },
  {
    key: '2',
    image: product2,
    productType: 'ACCESSORIES',
    description: 'Tech21 Evo Clear for Google Pixel 6 Pro – Crystal Clear Phone Case with 12ft Multi-Dr...',
    price: '$39',
    quantity: 'x1',
    subTotal: '$39'
  }
];

const OrderDetail = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Review Submitted:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="order-detail-container">
      <div className="details-header">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          className="back-btn"
          onClick={() => navigate('/order-history')}
        >
          Order Detail
        </Button>
        <Button
          type="link"
          className="rating-btn"
          onClick={showModal}
        >
          Leave a Rating <PlusOutlined />
        </Button>
      </div>

      <hr className="order-detail-hr" />

      <div className="order-info">
        <div className="left">
          <h3>#96459761</h3>
          <p>4 Products • Order Placed on 17 Jan, 2021 at 7:32 PM</p>
        </div>
        <div className="right">
          <h3>$1199.00</h3>
        </div>
      </div>

      <div className="arrival-info">
        <p>Order expected arrival <strong>23 Jan, 2021</strong></p>
      </div>

      <div className="order-steps">
        <Steps current={1} labelPlacement="vertical" className="custom-steps">
          <Step title="Order Placed" icon={<ShoppingOutlined />} />
          <Step title="Packaging" icon={<GiftOutlined />} />
          <Step title="On The Road" icon={<CarOutlined />} />
          <Step title="Delivered" icon={<CheckCircleOutlined />} />
        </Steps>
      </div>

      <hr className="order-detail-hr" />

      <div className="order-activity">
        <h2>Order Activity</h2>
        {orderActivities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className={`icon-wrapper ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="activity-details">
              <h4>{activity.text}</h4>
              <p>{activity.date}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="order-detail-hr" />

      {/* Order Products Section converted to Table */}
      <div className="order-products">
        <h2>Product (02)</h2>
        <Table
          columns={productColumns}
          dataSource={productData}
          pagination={false}
          className="order-products-table"
        />
      </div>

      <div className="order-addresses">
        <div className="address-card">
          <h3>Billing Address</h3>
          <p><strong>Kevin Gilbert</strong></p>
          <p>
            East Tejturi Bazar, Word No. 04, Road No. 13/x,<br />
            House no. 1320/C, Flat No. 5D,<br />
            Dhaka - 1200, Bangladesh
          </p>
          <p><strong>Phone Number:</strong> +1-202-555-0118</p>
          <p><strong>Email:</strong> kevin.gilbert@gmail.com</p>
        </div>

        <div className="address-card">
          <h3>Shipping Address</h3>
          <p><strong>Kevin Gilbert</strong></p>
          <p>
            East Tejturi Bazar, Word No. 04, Road No. 13/x,<br />
            House no. 1320/C, Flat No. 5D,<br />
            Dhaka - 1200, Bangladesh
          </p>
          <p><strong>Phone Number:</strong> +1-202-555-0118</p>
          <p><strong>Email:</strong> kevin.gilbert@gmail.com</p>
        </div>

        <div className="address-card">
          <h3>Order Notes</h3>
          <p>Donec ac vehicula turpis. Aenean sagittis est eu arcu ornare, eget venenatis purus lobortis.</p>
          <p>Aliquam erat volutpat. Aliquam magna odio.</p>
        </div>
      </div>

      {/* MODAL START */}
      <Modal
        title="Reviews"
        visible={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields(); // Clears the form when modal is closed manually
        }}
        className="rating-modal"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please give a rating' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: 'Please write your feedback' }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 4, maxRows: 8 }}
              placeholder="Write down your feedback about our product & services"
              maxLength={300}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleOk}
              block
              className="custom-submit-btn"
            >
              Publish Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* MODAL END */}
    </div>
  );
};

export default OrderDetail;
