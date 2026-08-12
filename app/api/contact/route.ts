import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const company = clean(body.company);
  const message = clean(body.message);
  const website = clean(body.website);

  // Quietly accept common bot submissions so automated spam does not retry.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (name.length < 2 || name.length > 80 || !EMAIL_PATTERN.test(email) || email.length > 160 || company.length > 120 || message.length < 10 || message.length > 4000) {
    return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'abdulaziz.amori10@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Abdulaziz Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('Contact form is missing RESEND_API_KEY.');
    return NextResponse.json({ error: 'Email delivery is not configured yet. Please use the email link instead.' }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || 'Not provided');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `portfolio-contact-${crypto.randomUUID()}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`,
        html: `<h2>New portfolio enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Company:</strong> ${safeCompany}</p><p><strong>Message:</strong><br/>${safeMessage}</p>`,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend rejected the contact email:', response.status, detail);
      return NextResponse.json({ error: 'Your message could not be delivered. Please try again or email me directly.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email request failed:', error);
    return NextResponse.json({ error: 'Your message could not be delivered. Please try again or email me directly.' }, { status: 502 });
  }
}
