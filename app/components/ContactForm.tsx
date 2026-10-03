'use client';

import { AlertCircle, Check, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { Dictionary } from '../i18n/ui';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ labels }: { labels: Dictionary['form'] }) {
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
        throw new Error(labels.error);
      }

      form.reset();
      setStatus('success');
    } catch {
      setErrorMessage(labels.error);
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
    <label>{labels.name}<input required name="name" minLength={2} maxLength={80} autoComplete="name" /></label>
    <label>{labels.email}<input required name="email" type="email" maxLength={160} autoComplete="email" /></label>
    <label>{labels.company}<input name="company" maxLength={120} autoComplete="organization" /></label>
    <label>{labels.message}<textarea required name="message" minLength={10} maxLength={4000} placeholder={labels.messagePlaceholder} rows={5}/></label>
    <button className="button" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? labels.sending : labels.send} <Send size={16} className="dir-icon"/>
    </button>
    <div className={`contact-form-status ${status}`} aria-live="polite" role="status">
      {status === 'success' && <><Check size={17}/> {labels.success}</>}
      {status === 'error' && <><AlertCircle size={17}/> {errorMessage}</>}
    </div>
  </form>;
}
