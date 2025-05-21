import React, { useState } from 'react';
import './Faqs.scss';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const faqData = [
    {
      question: 'How do I track my order after placing it?',
      answer:
        'Once your order is confirmed, you’ll receive a tracking number via email or SMS. You can use this number to track your order status in real-time through our “Track My Order” page. We also send automated updates when your order is packed, shipped, and out for delivery.',
    },
    {
      question: 'What is your return and exchange policy?',
      answer:
        'We offer a 14-day hassle-free return and exchange policy. If you’re not completely satisfied with your purchase, simply initiate a return through your account dashboard. The item must be unused and in its original packaging. Once received and inspected, we’ll issue a full refund or replacement as requested.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to over 50 countries worldwide. International shipping fees and delivery timelines may vary depending on your location. All applicable customs duties or taxes will be shown at checkout, so there are no hidden fees later.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and select Buy Now, Pay Later options like Klarna and Afterpay. For added security, all transactions are encrypted, and we never store your payment information.',
    },
    {
      question: 'How do I apply a discount code or voucher?',
      answer:
        'At checkout, you’ll see a field labeled “Promo Code” or “Discount Code.” Enter your code there and click “Apply.” The total amount will update instantly if the code is valid. Note that some codes have expiration dates or are only valid on specific categories or minimum orders.',
    },
  ];
  

const Faqs = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="faqs-wrapper">
      <h2 className="faq-heading">Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div key={index} className="faq-box">
          <div
            className={`faq-question ${openIndexes.includes(index) ? 'active' : ''}`}
            onClick={() => toggleIndex(index)}
          >
            <span>{item.question}</span>
            {openIndexes.includes(index) ? (
              <MinusOutlined className="icon" />
            ) : (
              <PlusOutlined className="icon" />
            )}
          </div>
          {openIndexes.includes(index) && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
