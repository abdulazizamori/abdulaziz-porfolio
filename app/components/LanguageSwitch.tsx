type Props = { label: string; lang: string; title: string; href: string };

/** Links to the same page in the other language. A plain link, since each language has its own root layout. */
export default function LanguageSwitch({ label, lang, title, href }: Props) {
  return <a className="lang-switch" href={href} hrefLang={lang} lang={lang} title={title}>{label}</a>;
}
