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
    <div className="contact">
      <div className="contact__postcard">
        {/* Desktop reads this as the postcard's own back — the whole
            surface. Below the mobile breakpoint (see Contact.css) it
            becomes just the "letter" tucked into contact__envelope-footer
            below, a display:contents no-op the rest of the time so it
            doesn't disturb the postcard's flex layout. */}
        <div className="contact__letter-sheet">
          <p className="contact__postcard-label">Postcard</p>

          {state.succeeded ? (
            <div className="contact__success">
              <p className="contact__salutation">Delivered!</p>
              <p className="contact__note">
                Thanks for the note — I'll write back soon.
              </p>
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

              <div className="contact__postcard-body">
                <div className="contact__message-side">
                  <p className="contact__salutation">Dear Kynara,</p>
                  <textarea
                    className="contact__message"
                    name="message"
                    placeholder="Juicy details go here..."
                    required
                    aria-label="Message"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="contact__error" />

                  <div className="contact__signoff-row">
                    <span className="contact__signoff">Yours,</span>
                    <input
                      className="contact__blank contact__blank--name"
                      name="name"
                      type="text"
                      placeholder="sign here"
                      required
                      autoComplete="name"
                      aria-label="Your name"
                    />
                  </div>
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="contact__error contact__error--right" />

                  <div className="contact__address-line contact__reply-line">
                    <span>reply to:</span>
                    <input
                      className="contact__blank contact__blank--email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      aria-label="Your email"
                    />
                  </div>
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="contact__error" />
                </div>

                <div className="contact__divider" aria-hidden="true" />

                <div className="contact__address-side">
                  <div className="contact__stamp-area" aria-hidden="true">
                    <div className="contact__postmark" />
                    <img
                      src="/images/postage-stamp.png"
                      alt=""
                      className="contact__stamp-img"
                      draggable={false}
                    />
                  </div>

                  <div className="contact__address-lines">
                    <p className="contact__address-line contact__address-line--fixed">
                      Kynara Fernandes
                    </p>
                    <div className="contact__address-line contact__address-line--empty" />
                    <div className="contact__address-line contact__address-line--empty" />
                  </div>
                </div>
              </div>

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

        {/* Mobile-only decoration (see Contact.css) — the envelope the
            letter above is tucked into. Hidden entirely on desktop, where
            the postcard metaphor doesn't need it. No stamp here — that's
            the postcard's thing; the letter is just a letter. */}
        <div className="contact__envelope-footer" aria-hidden="true">
          <div className="contact__envelope-flap" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
