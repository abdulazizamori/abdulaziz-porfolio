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
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      website: formData.get('website'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Your message could not be sent. Please try again.');
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
      setStatus('error');
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-honeypot" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
    <input required name="name" minLength={2} maxLength={80} autoComplete="name" aria-label="Your name" placeholder="Your name" />
    <input required name="email" type="email" maxLength={160} autoComplete="email" aria-label="Email address" placeholder="Email address" />
    <input name="company" maxLength={120} autoComplete="organization" aria-label="Company" placeholder="Company (optional)" />
    <textarea required name="message" minLength={10} maxLength={4000} aria-label="Project details" placeholder="What would you like to build?" rows={5}/>
    <button className="button" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={16}/>
    </button>
    <div className={`contact-form-status ${status}`} aria-live="polite" role="status">
      {status === 'success' && <><Check size={17}/> Message sent — thank you. I’ll be in touch soon.</>}
      {status === 'error' && <><AlertCircle size={17}/> {errorMessage}</>}
    </div>
  </form>;
}
