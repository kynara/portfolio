import React, { useCallback, useRef } from 'react';
import { ValidationError, useForm } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import AwesomeBtn from '../AwesomeBtn/AwesomeBtn';
import { colors } from '../../tokens';
import './Contact.css';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [state, handleSubmit] = useForm('xjyvbqvy');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSendPress = useCallback(() => {
    formRef.current?.requestSubmit();
  }, []);

  return (
    <div className="contact page">
      <div className="contact__container">
        <h1>Contact Me</h1>

        {state.succeeded ? (
          <div className="contact__success">
            <p>Thanks! Your message has been sent.</p>
            <AwesomeBtn
              color={colors.red}
              dark={colors.redDark}
              fontFamily="'Bayon', sans-serif"
              minWidth="104px"
              size="small"
              onPress={() => navigate('/')}
            >
              Back
            </AwesomeBtn>
          </div>
        ) : (
          <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Portfolio contact form submission" />

            <label htmlFor="contact-name">
              Name
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </label>
            <ValidationError prefix="Name" field="name" errors={state.errors} className="contact__error" />

            <label htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Your email"
                required
                autoComplete="email"
              />
            </label>
            <ValidationError prefix="Email" field="email" errors={state.errors} className="contact__error" />

            <label htmlFor="contact-message">
              Message
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your message"
                rows={5}
                required
              />
            </label>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="contact__error" />

            <ValidationError errors={state.errors} className="contact__error" />

            <div className="contact__actions">
              <AwesomeBtn
                color={colors.red}
                dark={colors.redDark}
                fontFamily="'Bayon', sans-serif"
                minWidth="104px"
                size="small"
                onPress={() => navigate('/')}
              >
                Back
              </AwesomeBtn>

              <AwesomeBtn
                color={colors.blue}
                dark={colors.blueDark}
                fontFamily="'Bayon', sans-serif"
                disabled={state.submitting}
                minWidth="104px"
                size="small"
                onPress={handleSendPress}
              >
                {state.submitting ? 'Sending...' : 'Send'}
              </AwesomeBtn>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
