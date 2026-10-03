import Link from 'next/link';

export default function NotFound() {
  return <main className="not-found">
    <h1>This page doesn’t exist.</h1>
    <p>The link may be old, or the project may have moved.</p>
    <Link className="button" href="/#work">See all work</Link>
  </main>;
}
