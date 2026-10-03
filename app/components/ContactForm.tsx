'use client';

import { AlertCircle, Check, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const encodedForm = new URLSearchParams();
    formData.forEach((value, key) => encodedForm.append(key, String(value)));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedForm.toString(),
      });

      if (!response.ok) {
        throw new Error('Your message could not be sent. Please try again.');
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
      setStatus('error');
    }
  }

  return <form className="contact-form" name="portfolio-contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
    <input type="hidden" name="form-name" value="portfolio-contact" />
    <input type="hidden" name="subject" value="New portfolio enquiry" />
    <div className="contact-honeypot" aria-hidden="true">
      <label htmlFor="bot-field">Don’t fill this out if you’re human</label>
      <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
    </div>
    <label>Your name<input required name="name" minLength={2} maxLength={80} autoComplete="name" /></label>
    <label>Email<input required name="email" type="email" maxLength={160} autoComplete="email" /></label>
    <label>Company (optional)<input name="company" maxLength={120} autoComplete="organization" /></label>
    <label>Message<textarea required name="message" minLength={10} maxLength={4000} placeholder="The role or project, and how I can help" rows={5}/></label>
    <button className="button" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={16}/>
    </button>
    <div className={`contact-form-status ${status}`} aria-live="polite" role="status">
      {status === 'success' && <><Check size={17}/> Message sent. Thanks, I’ll get back to you soon.</>}
      {status === 'error' && <><AlertCircle size={17}/> {errorMessage}</>}
    </div>
  </form>;
}
