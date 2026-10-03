import '../globals.css';
import RootDocument, { rootMetadata } from '../components/RootDocument';

export { viewport } from '../components/RootDocument';
export const metadata = rootMetadata('en');

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
