'use client';

import { QrCode, X } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useId, useRef, useState } from 'react';
import type { StoreLink } from '../data';
import type { Dictionary } from '../i18n/ui';

/** A button that shows scannable codes for an app's store listings, so desktop visitors can install it on their phone. */
export default function StoreQr({ links, labels }: { links: StoreLink[]; labels: Dictionary['qr'] }) {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const wrapper = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open || codes.length) return;
    Promise.all(links.map(link => QRCode.toString(link.href, { type: 'svg', margin: 1, color: { dark: '#07252a', light: '#ffffff' } }))).then(setCodes);
  }, [open, codes.length, links]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => { if (!wrapper.current?.contains(event.target as Node)) setOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('pointerdown', closeOnOutside); document.removeEventListener('keydown', closeOnEscape); };
  }, [open]);

  return <div className="store-qr" ref={wrapper}>
    <button type="button" className="text-link" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
      <QrCode size={15} aria-hidden="true"/>{labels.open}
    </button>
    {open && <div id={panelId} className="qr-panel" role="dialog" aria-label={labels.open}>
      <button type="button" className="qr-close" onClick={() => setOpen(false)} aria-label={labels.close}><X size={16} aria-hidden="true"/></button>
      <div className="qr-codes">
        {links.map((link, index) => <figure key={link.href}>
          {codes[index]
            ? <span className="qr-code" role="img" aria-label={`${labels.label} ${link.label}`} dangerouslySetInnerHTML={{ __html: codes[index] }}/>
            : <span className="qr-code" aria-hidden="true"/>}
          <figcaption>{link.label}</figcaption>
        </figure>)}
      </div>
      <p>{labels.hint}</p>
    </div>}
  </div>;
}
