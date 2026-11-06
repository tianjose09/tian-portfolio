import { useState } from 'react';
import Icon from '../components/Icon';
import useReveal from '../hooks/useReveal';
import { sendContactMessage } from '../api';
import '../styles/contact.css';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact({ profile }) {
  const ref = useReveal();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) er.message = 'Your message should be at least 10 characters.';
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      setStatus('error');
      setFeedback('Please check the highlighted fields.');
      return;
    }

    setStatus('sending');
    setFeedback('');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setFeedback('Thank you! Your message has been sent. I’ll get back to you soon.');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrors(err.fields || {});
      setFeedback(err.message);
    }
  };

  const field = (name, label, props = {}) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`c-${name}`}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea
          id={`c-${name}`}
          name={name}
          rows={5}
          value={form[name]}
          onChange={update}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `c-${name}-err` : undefined}
          maxLength={3000}
        />
      ) : (
        <input
          id={`c-${name}`}
          name={name}
          type={props.type || 'text'}
          value={form[name]}
          onChange={update}
          autoComplete={props.autoComplete}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `c-${name}-err` : undefined}
          maxLength={props.maxLength || 120}
        />
      )}
      {errors[name] && (
        <span className="field__error" id={`c-${name}-err`}>
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title" ref={ref}>
      <div className="container contact__grid">
        <div className="contact__info" data-reveal>
          <h2 className="section-title" id="contact-title">
            <span>Let’s build</span>
            <span className="accent">something great</span>
          </h2>
          <p className="contact__lead">
            I’m looking for an OJT / internship where I can contribute to real web and mobile projects. Have an
            opportunity or a question? Send me a message.
          </p>

          <ul className="contact__list">
            <li>
              <Icon name="mail" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <Icon name="github" />
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                github.com/tianjose09
              </a>
            </li>
            <li>
              <Icon name="linkedin" />
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn: Khristian Jose Guinto
              </a>
            </li>
            <li>
              <Icon name="pin" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={submit} noValidate data-reveal>
          <div className="contact__row">
            {field('name', 'Name', { autoComplete: 'name', maxLength: 80 })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
          </div>
          {field('subject', 'Subject (optional)')}
          {field('message', 'Message', { as: 'textarea' })}

          {/* Honeypot field: hidden from people, catches spam bots */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="c-website">Website</label>
            <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
          </div>

          <div className="contact__submit">
            <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
              <Icon name="arrow" size={18} />
            </button>
            <p
              className={`form-feedback form-feedback--${status}`}
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {feedback}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
