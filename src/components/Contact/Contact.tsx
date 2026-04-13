import React from 'react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { colors } from '../../tokens';
import './Contact.css';

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="contact page">
      <div className="contact__container">
        <h1>Contact Me</h1>
        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Your email" />
          </label>
          <label>
            Message
            <textarea placeholder="Your message" rows={5} />
          </label>
          <div className="contact__actions">
            <AwesomeBtn
              color={colors.blue}
              dark={colors.blueDark}
              onPress={() => alert('This is a basic contact page. It doesn\'t actually do anything!')}
            >
              Send
            </AwesomeBtn>
            <AwesomeBtn
              color={colors.red}
              dark={colors.redDark}
              size="small"
              onPress={() => navigate('/')}
            >
              Back
            </AwesomeBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
