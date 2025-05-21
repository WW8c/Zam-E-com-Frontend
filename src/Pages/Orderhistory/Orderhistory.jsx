import React from 'react';
import { Table, Tag, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';
import './OrderHistory.scss';

const OrderHistory = () => {
    const navigate = useNavigate();
    const dataSource = [
      {
        key: '1',
        orderId: '#96459761',
        status: 'IN PROGRESS',
        date: 'Dec 30, 2019 07:52',
        total: '$80 (5 Products)',
      },
      {
        key: '2',
        orderId: '#71667167',
        status: 'COMPLETED',
        date: 'Dec 7, 2019 23:26',
        total: '$70 (4 Products)',
      },
      {
        key: '3',
        orderId: '#95214362',
        status: 'CANCELED',
        date: 'Dec 7, 2019 23:26',
        total: '$2,300 (2 Products)',
      },
      {
        key: '4',
        orderId: '#71667167',
        status: 'COMPLETED',
        date: 'Feb 2, 2019 19:28',
        total: '$250 (1 Products)',
      },
      {
        key: '5',
        orderId: '#51746385',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$360 (2 Products)',
      },
      {
        key: '6',
        orderId: '#51746385',
        status: 'CANCELED',
        date: 'Dec 4, 2019 21:42',
        total: '$220 (7 Products)',
      },
      {
        key: '7',
        orderId: '#673971743',
        status: 'COMPLETED',
        date: 'Feb 2, 2019 19:28',
        total: '$80 (1 Products)',
      },
      {
        key: '8',
        orderId: '#673971743',
        status: 'COMPLETED',
        date: 'Mar 20, 2019 23:14',
        total: '$160 (1 Products)',
      },
      {
        key: '9',
        orderId: '#673971743',
        status: 'COMPLETED',
        date: 'Dec 4, 2019 21:42',
        total: '$1,500 (3 Products)',
      },
      {
        key: '10',
        orderId: '#673971743',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$1,200 (19 Products)',
      },
      {
        key: '11',
        orderId: '#673971743',
        status: 'CANCELED',
        date: 'Dec 30, 2019 05:18',
        total: '$1,500 (1 Products)',
      },
      {
        key: '12',
        orderId: '#673971743',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$80 (1 Products)',
      },
    ];
    
    const columns = [
      {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let color = 'blue';
          if (status === 'COMPLETED') color = 'green';
          else if (status === 'CANCELED') color = 'red';
          else if (status === 'IN PROGRESS') color = 'orange';
    
          return <Tag color={color}>{status}</Tag>;
        },
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button
            type="link"
            className="view-details-btn"
            onClick={() => navigate(`/order-detail/${record.orderId}`)}  // Navigates with the orderId
            // Navigate to OrderDetail with the orderId
          >
            View Details <ArrowRightOutlined />
          </Button>
        ),
      },
    ];
 
  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
};

export default OrderHistory;
