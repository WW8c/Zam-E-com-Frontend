import React from 'react';
import './Aboutus.scss';
import { aboutus, team, team1, team2, team3} from '../../assets';
import { CheckCircleOutlined } from '@ant-design/icons';
// import { team1, team2, team3, team4, team5, team6, team7, team8 } from '../../assets';

const teamMembers = [
    { img: team, name: 'Kevin Gilbert', role: 'Chief Executive Officer' },
    { img: team1, name: 'Sophia Bennett', role: 'Assistant of CEO' },
    { img: team2, name: 'Liam Martinez', role: 'Head of Design' },
    { img: team3, name: 'Olivia Jackson', role: 'UX Designer' },
    { img: team3, name: 'Ethan Brown', role: 'Marketing Head' },
    { img: team2, name: 'Isabella Smith', role: 'Customer Manager' },
    { img: team1, name: 'Noah Wilson', role: 'Logistics Manager' },
    { img: team3, name: 'Emma Davis', role: 'Lead Developer' },
  ];
const Aboutus = () => {
    
  return (
    <div className="aboutus-page">
    <div className="aboutus-container">
      <div className="aboutus-left">
        <h2>WHO WE ARE</h2>
        <h3>Kinbo - largest electronics retail shop in the world.</h3>
        <p>
          Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus,
          ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus.
          Nullam tempus lectus a dui aliquet, non ultricies nibh elementum. Nulla ac nulla dolor.
        </p>
        <ul>
          <li><CheckCircleOutlined className="check-icon" /> Great 24/7 customer services.</li>
          <li><CheckCircleOutlined className="check-icon" /> 600+ Dedicated employees.</li>
          <li><CheckCircleOutlined className="check-icon" /> 50+ Branches all over the world.</li>
          <li><CheckCircleOutlined className="check-icon" /> Over 1 Million Electronics Products.</li>
        </ul>
      </div>

      <div className="aboutus-right">
        <img src={aboutus} alt="About Us" />
      </div>
    </div>
    
    <div className="team-section">
        <h2 className="team-heading">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} className="team-img" />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
